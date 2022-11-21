import { Event } from '../models/Event';
import { EventService } from './../services/event.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  public modalRef!: BsModalRef;
  public events: Event[] = [];
  public filteredEvents: Event[] = [];

  public widthImg = 50;
  public marginImg = 2;
  public showImg = true;
  private _listFilter = '';

  public get listFilter(): string {
    return this._listFilter;
  }

  public set listFilter(value: string) {
    this._listFilter = value;
    this.filteredEvents = this.listFilter ? this.filterEvent(this.listFilter) : this.events;
  }

  filterEvent(filterBy: string): Event[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.events.filter((event: { theme: string; local: string; }) => event.theme.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
      event.local.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  constructor(
    private eventService: EventService,
    private modalService: BsModalService) { }

  public ngOnInit(): void {
    this.getEvents();
  }

  public changeImg(): void {
    this.showImg = !this.showImg;
  }

  public getEvents(): void {
    this.eventService.getEvent().subscribe({
      next: (eventsRes: Event[]) => {
        this.events = eventsRes;
        this.filteredEvents = this.events;
      },
      error: (error: any) => console.log(error)
    });
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
