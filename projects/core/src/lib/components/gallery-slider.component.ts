import {
  Component,
  Input,
  Output,
  OnDestroy,
  OnInit,
  OnChanges,
  Inject,
  NgZone,
  ElementRef,
  EventEmitter,
  ChangeDetectionStrategy,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, Subscription, fromEvent } from 'rxjs';
import { map, tap, debounceTime } from 'rxjs/operators';
import { GalleryState, GalleryConfig, SlidingDirection } from '../models';
import { SliderState, WorkerState } from '../models/slider.model';
import { Gallery } from '../services/gallery.service';

declare const Hammer: any;

@Component({
  selector: 'gallery-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  template: `
    <div *ngIf="sliderState$ | async; let sliderState"
         class="g-items-container"
         [ngStyle]="zoom">

      <div class="g-slider"
           [class.g-no-transition]="sliderState.active"
           [ngStyle]="sliderState.style">

        <gallery-item *ngFor="let item of state.items; let i = index"
                      [type]="item.type"
                      [config]="config"
                      [data]="item.data"
                      [currIndex]="state.currIndex"
                      [index]="i"
                      (tapClick)="itemClick.emit(i)">
        </gallery-item>

      </div>
    </div>
    <ng-content></ng-content>
  `
})
export class GallerySliderComponent implements OnInit, OnChanges, OnDestroy {

  /** Sliding worker */
  private readonly _slidingWorker$ = new BehaviorSubject<WorkerState>({value: 0, active: false});

  /** HammerJS instance */
  private _hammer: any;

  /** Stream that emits when the view is re-sized */
  private _resizeSub$: Subscription;

  /** Stream that emits sliding state */
  sliderState$: Observable<SliderState>;

  /** Gallery state */
  @Input() state: GalleryState;

  /** Gallery config */
  @Input() config: GalleryConfig;

  @Input() width: number;
  @Input() height: number;

  /** Stream that emits when the active item should change */
  @Output() action = new EventEmitter<string | number>();

  /** Stream that emits when item is clicked */
  @Output() itemClick = new EventEmitter<number>();

  /** Item zoom */
  get zoom() {
    return {transform: `perspective(50px) translate3d(0, 0, ${-this.config.zoomOut}px)`};
  }

  constructor(private gallery: Gallery, private _el: ElementRef, private _zone: NgZone, @Inject(PLATFORM_ID) private platform: Object) {

    // Activate sliding worker
    this.sliderState$ = this._slidingWorker$.pipe(map((state: WorkerState) => ({
      style: this.getSliderState(state),
      active: state.active
    })));
  }

  ngOnChanges() {
    // Refresh the slider
    this.updateSlider({value: 0, active: false});
  }

  ngOnInit() {
    if (this.config.gestures && typeof Hammer !== 'undefined') {

      // Activate gestures
      this._hammer = new Hammer(this._el.nativeElement);
      this._hammer.get('pan').set({direction: Hammer.DIRECTION_ALL});

      this._zone.runOutsideAngular(() => {
        // Move the slider
        this._hammer.on('pan', (e) => {

          switch (this.config.slidingDirection) {
            case SlidingDirection.Horizontal:
              this.updateSlider({value: e.deltaX, active: true});
              if (e.isFinal) {
                this.updateSlider({value: 0, active: false});
                this.horizontalPan(e);
              }
              break;
            case SlidingDirection.Vertical:
              this.updateSlider({value: e.deltaY, active: true});
              if (e.isFinal) {
                this.updateSlider({value: 0, active: false});
                this.verticalPan(e);
              }
          }
        });
      });
    }

    // Rearrange slider on window resize
    if (isPlatformBrowser(this.platform)) {
      this._resizeSub$ = fromEvent(window, 'resize').pipe(
        debounceTime(200),
        tap(() => this.updateSlider(this._slidingWorker$.value))
      ).subscribe();
    }

    // This component width is set to 100%, therefore its width gives 0 at the beginning
    // TODO: find a cleaner way to refresh the gallery once slider width is available
    // Current workaround: wait 500ms then refresh the slider to fix gallery items' width
    setTimeout(() => {
      this.updateSlider({value: 0, active: false});
    }, 500);
  }

  ngOnDestroy() {
    if (this._hammer) {
      this._hammer.destroy();
    }
    if (this._resizeSub$) {
      this._resizeSub$.unsubscribe();
    }
    this._slidingWorker$.complete();
  }

  /**
   * Convert sliding state to styles
   */
  private getSliderState(state: WorkerState): any {
    switch (this.config.slidingDirection) {
      case SlidingDirection.Horizontal:
        return {
          transform: `translate3d(${-(this.state.currIndex * this._el.nativeElement.offsetWidth) + state.value}px, 0, 0)`,
          width: this._el.nativeElement.offsetWidth * this.state.items.length + 'px',
          height: '100%'
        };
      case SlidingDirection.Vertical:
        return {
          transform: `translate3d(0, ${-(this.state.currIndex * this._el.nativeElement.offsetHeight) + state.value}px, 0)`,
          width: '100%',
          height: this._el.nativeElement.offsetHeight * this.state.items.length + 'px'
        };
    }
  }

  private verticalPan(e) {
    if (e.velocityY > 0.3) {
      this.prev();
    } else if (e.velocityY < -0.3) {
      this.next();
    } else {
      if (e.deltaY / 2 <= -this._el.nativeElement.offsetHeight * this.state.items.length / this.config.panSensitivity) {
        this.next();
      } else if (e.deltaY / 2 >= this._el.nativeElement.offsetHeight * this.state.items.length / this.config.panSensitivity) {
        this.prev();
      } else {
        this.action.emit(this.state.currIndex);
      }
    }
  }

  private horizontalPan(e) {
    if (e.velocityX > 0.3) {
      this.prev();
    } else if (e.velocityX < -0.3) {
      this.next();
    } else {
      if (e.deltaX / 2 <= -this._el.nativeElement.offsetWidth * this.state.items.length / this.config.panSensitivity) {
        this.next();
      } else if (e.deltaX / 2 >= this._el.nativeElement.offsetWidth * this.state.items.length / this.config.panSensitivity) {
        this.prev();
      } else {
        this.action.emit(this.state.currIndex);
      }
    }
  }

  private next() {
    this.action.emit('next');
  }

  private prev() {
    this.action.emit('prev');
  }

  private updateSlider(state: WorkerState) {
    this._slidingWorker$.next({...this._slidingWorker$.value, ...state});
  }
}
