import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HashService } from 'src/app/services/hash-service';
import { MessageService } from 'src/app/services/msgs';
import { OpResponse } from 'src/app/domain/responses';
import { BaseEncodingService } from 'src/app/services/base-encoding-service';

@Component({
  selector: 'base-encoding-form',
  templateUrl: './base-encoding-form.component.html',
  styleUrls: ['./base-encoding-form.component.scss']
})
export class BaseEncodingFormComponent {

  public form : FormGroup = this.fb.group({
    text: ['', Validators.compose([Validators.required, Validators.maxLength(1500)])],
  });

  public title?: string;
  public action: 'encode' | 'decode' = 'encode';
  public result?: string;

  constructor(
    private fb: FormBuilder,
    private baseEncService: BaseEncodingService,
    private route: ActivatedRoute,
    private msgs: MessageService
  ) { }

  ngOnInit() {
    this.form.valueChanges.subscribe((values) => {
      this.result = '';
    });
    this.route.params.subscribe(params => {
      this.action = params['action'];
      this.result = '';
      this.title = this.generateTitle(this.action!, 'Base64');
    });
  }

  private generateTitle(action: string, base: string) : string{
    let str = `${action} ${base}`;
    str = str[0].toUpperCase() + str.slice(1);
    return str;
  }

  public send() {
    if (this.form.valid) {
      this.baseEncService.base64(this.action!, this.form.get('text')!.value)
          .subscribe((resp: OpResponse) => {
            this.result = resp.result;
          });
    }
  }


}

