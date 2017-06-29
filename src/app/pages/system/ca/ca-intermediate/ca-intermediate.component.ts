import { ApplicationRef, Component, Injector, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormArray, Validators, AbstractControl} from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { EntityConfigComponent } from '../../../common/entity/entity-config/';

import { GlobalState } from '../../../../global.state';
import { RestService, WebSocketService, SystemGeneralService} from '../../../../services/';
import { FieldConfig } from '../../../common/entity/entity-form/models/field-config.interface';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'system-certificate-intermediate',
  template: `<entity-form [conf]="this"></entity-form>`,
  providers: [SystemGeneralService]
})

export class CertificateAuthorityIntermediateComponent {

  protected resource_name: string = 'system/certificateauthority/intermediate';
  protected route_success: string[] = ['system','ca'];
<<<<<<< HEAD
  public formModel: DynamicFormControlModel[] = [
    new DynamicSelectModel({
        id: 'cert_signedby',
        label: 'Signing Certificate Authority',
    }),
    new DynamicInputModel({
        id: 'cert_name',
        label: 'Identifier',
    }),
    new DynamicSelectModel({
        id: 'cert_key_length',
        label: 'Key Length',
=======
  protected isEntity: boolean = true;
  protected fieldConfig: FieldConfig[] = [
    {
        type: 'select',
        name: 'cert_signedby',
        placeholder: 'Signing Certificate Authority',
        options: []
    },
    {
        type: 'input',
        name: 'cert_name',
        placeholder: 'Identifier',
    },
    {
        type: 'select',
        name: 'cert_key_length',
        placeholder: 'Key Length',
>>>>>>> cc462787f7bb9fefc93823f47db32f6623176ade
        options: [
          { label: '1024', value: 1024 },
          { label: '2048', value: 2048 },
          { label: '4096', value: 4096 },
        ],
    },
    {
        type: 'select',
        name: 'cert_digest_algorithm',
        placeholder: 'Digest Algorithm',
        options: [
          { label: 'SHA1', value: 'SHA1' },
          { label: 'SHA224', value: 'SHA224' },
          { label: 'SHA256', value: 'SHA256' },
          { label: 'SHA384', value: 'SHA384' },
          { label: 'SHA512', value: 'SHA512' },
        ],
    },
    {
        type: 'input',
        name: 'cert_lifetime',
        placeholder: 'Lifetime',
    },
    {
        type: 'select',
        name: 'cert_country',
        placeholder: 'Country',
        options: [
          { label: 'US', value: 'US' },
          { label: 'CHINA', value: 'CN' },
          { label: 'RUSSIA', value: 'RU' },
        ],
    },
    {
        type: 'input',
        name: 'cert_state',
        placeholder: 'State',
    },
    {
        type: 'input',
        name: 'cert_city',
        placeholder: 'Locality',
    },
    {
        type: 'input',
        name: 'cert_organization',
        placeholder: 'Organization',
    },
    {
        type: 'input',
        name: 'cert_email',
        placeholder: 'Email',
        validation: [
          Validators.email
        ]
    },
    {
        type: 'input',
        name: 'cert_common',
        placeholder: 'Common Name',
    },
  ];
  private cert_signedby: any;

  ngOnInit() {
    this.systemGeneralService.getCA().subscribe((res) => {
      this.cert_signedby = _.find(this.fieldConfig, {'name': 'cert_signedby'});
      res.forEach((item) => {
        this.cert_signedby.options.push({ label: item.cert_name, value: item.id });
      });
    });
  }

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected rest: RestService,
    protected ws: WebSocketService,
    protected _injector: Injector,
    protected _appRef: ApplicationRef,
    protected _state: GlobalState,
    protected systemGeneralService: SystemGeneralService
  ) {}


}
