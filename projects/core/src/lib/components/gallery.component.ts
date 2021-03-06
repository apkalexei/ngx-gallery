import {
  Component,
  Input,
  Output,
  OnInit,
  OnChanges,
  OnDestroy,
  HostBinding,
  TemplateRef,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Subscription, SubscriptionLike } from 'rxjs';
import { Gallery } from '../services/gallery.service';
import { GalleryRef } from '../services/gallery-ref';
import { GalleryItem, GalleryState } from '../models';
import { IframeItem, ImageItem, VideoItem, YoutubeItem } from './templates';

@Component({
  selector: 'gallery',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <gallery-core [state]="galleryRef.state$ | async"
                  [config]="galleryRef.config$ | async"
                  (action)="onAction($event)"
                  (itemClick)="onItemClick($event)"
                  (thumbClick)="onThumbClick($event)"></gallery-core>
    <ng-content></ng-content>
  `
})
export class GalleryComponent implements OnInit, OnChanges, OnDestroy {

  galleryRef: GalleryRef;
  @Input() id: string;
  @Input() items: GalleryItem [];
  @Input() nav: boolean = this._gallery.config.nav;
  @Input() dots: boolean = this._gallery.config.dots;
  @Input() loop: boolean = this._gallery.config.loop;
  @Input() fluid: boolean = this._gallery.config.fluid;
  @Input() thumb: boolean = this._gallery.config.thumb;
  @Input() zoomOut: number = this._gallery.config.zoomOut;
  @Input() counter: boolean = this._gallery.config.counter;
  @Input() autoPlay: boolean = this._gallery.config.autoPlay;
  @Input() gestures: boolean = this._gallery.config.gestures;
  @Input() thumbWidth: number = this._gallery.config.thumbWidth;
  @Input() thumbHeight: number = this._gallery.config.thumbHeight;
  @Input() disableThumb: boolean = this._gallery.config.disableThumb;
  @Input() panSensitivity: number = this._gallery.config.panSensitivity;
  @Input() playerInterval: number = this._gallery.config.playerInterval;
  @Input() itemTemplate: TemplateRef<any> = this._gallery.config.itemTemplate;
  @Input() thumbTemplate: TemplateRef<any> = this._gallery.config.thumbTemplate;
  @Input() thumbMode: 'strict' | 'free' = this._gallery.config.thumbMode;
  @Input() slidingDirection: 'horizontal' | 'vertical' = this._gallery.config.slidingDirection;
  @Input() loadingStrategy: 'preload' | 'lazy' | 'default' = this._gallery.config.loadingStrategy;
  @Input() thumbPosition: 'top' | 'left' | 'right' | 'bottom' = this._gallery.config.thumbPosition;

  // Inputs used by the lightbox

  /** Destroy gallery ref on component destroy event */
  @Input() destroyRef = true;

  /** Skip initializing the config with components inputs (Lightbox mode) */
  @Input() skipInitConfig = false;

  @Output() itemClick = new EventEmitter<number>();
  @Output() thumbClick = new EventEmitter<number>();
  @Output() player = new EventEmitter<GalleryState>();
  @Output() indexChange = new EventEmitter<GalleryState>();
  @Output() itemsChange = new EventEmitter<GalleryState>();

  /** Set thumbnails position */
  @HostBinding('class.g-fluid') get gallerySize() {
    return this.galleryRef.config.fluid;
  }

  private _player$: SubscriptionLike = Subscription.EMPTY;
  private _itemClick$: SubscriptionLike = Subscription.EMPTY;
  private _thumbClick$: SubscriptionLike = Subscription.EMPTY;
  private _itemChange$: SubscriptionLike = Subscription.EMPTY;
  private _indexChange$: SubscriptionLike = Subscription.EMPTY;
  private _playerListener$: SubscriptionLike = Subscription.EMPTY;

  constructor(private _gallery: Gallery) {
  }

  private getConfig() {
    return {
      nav: this.nav,
      dots: this.dots,
      loop: this.loop,
      fluid: this.fluid,
      thumb: this.thumb,
      zoomOut: this.zoomOut,
      counter: this.counter,
      autoPlay: this.autoPlay,
      gestures: this.gestures,
      thumbMode: this.thumbMode,
      thumbWidth: this.thumbWidth,
      thumbHeight: this.thumbHeight,
      disableThumb: this.disableThumb,
      itemTemplate: this.itemTemplate,
      thumbTemplate: this.thumbTemplate,
      thumbPosition: this.thumbPosition,
      panSensitivity: this.panSensitivity,
      playerInterval: this.playerInterval,
      loadingStrategy: this.loadingStrategy,
      slidingDirection: this.slidingDirection,
    };
  }

  onAction(i: string | number) {
    switch (i) {
      case 'next':
        this.galleryRef.next();
        break;
      case 'prev':
        this.galleryRef.prev();
        break;
      default:
        this.galleryRef.set(<number>i);
    }
  }

  ngOnChanges() {
    if (this.galleryRef) {
      this.galleryRef.setConfig(this.getConfig());

      if (this.items !== this.galleryRef.state.items) {
        this.load(this.items);
      }
    }
  }

  ngOnInit() {
    // Get gallery instance by id
    if (this.skipInitConfig) {
      this.galleryRef = this._gallery.ref(this.id);
    } else {
      this.galleryRef = this._gallery.ref(this.id, this.getConfig());
    }

    this.galleryRef.state$.subscribe(e => console.log(e));
    // Load gallery items
    this.load(this.items);

    // Activate player listener
    this._playerListener$ = this.galleryRef.activatePlayer().subscribe();

    // Subscribes to events on demand
    if (this.indexChange.observers.length) {
      this._indexChange$ = this.galleryRef.indexChanged.subscribe((state: GalleryState) => this.indexChange.emit(state));
    }
    if (this.itemsChange.observers.length) {
      this._itemChange$ = this.galleryRef.itemsChanged.subscribe((state: GalleryState) => this.itemsChange.emit(state));
    }
    if (this.player.observers.length) {
      this._player$ = this.galleryRef.player.subscribe((state: GalleryState) => this.player.emit(state));
    }
  }

  ngOnDestroy() {
    this._player$.unsubscribe();
    this._itemClick$.unsubscribe();
    this._thumbClick$.unsubscribe();
    this._itemChange$.unsubscribe();
    this._indexChange$.unsubscribe();
    this._playerListener$.unsubscribe();
    if (this.destroyRef) {
      this.galleryRef.reset();
    }
  }

  onItemClick(i: number) {
    this.itemClick.emit(i);
    this.galleryRef.itemClick.next(i);
  }

  onThumbClick(i: number) {
    this.thumbClick.emit(i);
    this.galleryRef.thumbClick.next(i);
  }

  load(items: GalleryItem[]) {
    this.galleryRef.load(items);
  }

  add(item: GalleryItem, active?: boolean) {
    this.galleryRef.add(item, active);
  }

  addImage(data: any, active?: boolean) {
    this.add(new ImageItem(data), active);
  }

  addVideo(data: any, active?: boolean) {
    this.add(new VideoItem(data), active);
  }

  addIframe(data: any, active?: boolean) {
    this.add(new IframeItem(data), active);
  }

  addYoutube(data: any, active?: boolean) {
    this.add(new YoutubeItem(data), active);
  }

  remove(i: number) {
    this.galleryRef.remove(i);
  }

  next() {
    this.galleryRef.next();
  }

  prev() {
    this.galleryRef.prev();
  }

  set(i: number) {
    this.galleryRef.set(i);
  }

  reset() {
    this.galleryRef.reset();
  }

  play() {
    this.galleryRef.play();
  }

  stop() {
    this.galleryRef.stop();
  }
}
