export class Question {
  _id: string;
  valid: string;
  answers: string[];
  text: string;

  constructor() {
    this.text = '';
  }
}
