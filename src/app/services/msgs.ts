import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

let URL_ICON_TPL = 'https://www.gravatar.com/avatar/${hash}?d=${iconType}';

@Injectable({
    providedIn: 'root'
  })
export class MessageService {

    constructor(
        private snackBar: MatSnackBar
    ) {
    }

    public showErrorMsg(msg: string, duration: number = 5000, closeLabel = 'CERRAR') {
        this.showMsg(msg, 'error-msg', duration, closeLabel);
    }

    public showInfoMsg(msg: string, duration: number = 3000, closeLabel = 'CERRAR') {
        this.showMsg(msg, 'info-msg', duration, closeLabel);
    }

    public showMsg(msg: string, buttonClass = 'info-msg', duration: number = 3000, closeLabel = 'CERRAR') {
        let snackBarRef = this.snackBar.open(msg, closeLabel, {
            duration: duration,
            panelClass: buttonClass
        });

        snackBarRef.onAction().subscribe(() => {
            snackBarRef.dismiss();
        });
    }


}

