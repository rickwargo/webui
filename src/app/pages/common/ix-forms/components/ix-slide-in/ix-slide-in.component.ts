import {
  Component, ComponentFactoryResolver, ElementRef, Input, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef,
} from '@angular/core';
import { IxSlideInService } from 'app/services/ix-slide-in.service';

@Component({
  selector: 'ix-slide-in',
  templateUrl: './ix-slide-in.component.html',
  styleUrls: ['./ix-slide-in.component.scss'],
})
export class IxSlideInComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @ViewChild('body', { static: true, read: ViewContainerRef }) slideInBody: ViewContainerRef;

  isSlideInOpen = false;
  private element: HTMLElement;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private el: ElementRef,
    protected slideInService: IxSlideInService,
  ) {
    this.element = this.el.nativeElement;
  }

  close(): void {
    this.slideInService.close();
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).className === 'ix-slide-in') {
        this.close();
      }
    });

    this.slideInService.setModal(this);
  }

  ngOnDestroy(): void {
    this.element.remove();
    this.slideInService.close();
  }

  closeSlideIn(): void {
    this.isSlideInOpen = false;

    // Destroying child component later improves performance a little bit.
    setTimeout(() => {
      this.slideInBody.clear();
    }, 0);

    document.body.classList.remove('ix-slide-in-open');
  }

  openSlideIn<T>(componentType: Type<T>): T {
    this.isSlideInOpen = true;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    this.slideInBody.clear();

    const componentRef = this.slideInBody.createComponent<T>(componentFactory);

    document.body.classList.add('ix-slide-in-open');
    return componentRef.instance;
  }
}
