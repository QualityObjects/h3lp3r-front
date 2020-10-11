import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '@app/services/msgs';
import { OpResponse } from '@app/domain/responses';
import { RandomService } from '@app/services/random-service';
import { RandomName } from '@app/domain/random-data';

@Component({
  selector: 'oracle-question-form',
  templateUrl: './oracle-question-form.component.html',
  styleUrls: ['./oracle-question-form.component.scss']
})
export class OracleQuestionFormComponent {

  public form : FormGroup = this.fb.group({
    question: [null, ],
    type: ["YES_NO", ],
  });

  public title: string = "The oracle answers";
  public result: RandomName[];

  constructor(
    private fb: FormBuilder,
    private randomService: RandomService,
    private route: ActivatedRoute,
    private msgs: MessageService
  ) { }

  ngOnInit() {
    this.form.valueChanges.subscribe((values) => {
      this.result = null;
    });

  }


  public send() {
    if (this.form.valid) {
      const questionType = this.form.get('type').value || 'YES_NO';
      const question = this.form.get('question').value;
      this.randomService.askOracle(questionType, question)
          .subscribe((resp: OpResponse) => {
            this.result = resp.result;
          });
    }
  }


}

