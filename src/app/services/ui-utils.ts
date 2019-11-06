import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";


@Injectable()
export class UIUtilsService {
  constructor(
    public dialog: MatDialog
  ) { }

  /**
 * Para mostrar en un popup un determinado componente.
 * @param data los datos que recibe el componente 
 * @param size el tamaño de la ventana de diálogo  {width:"", height:""}
 * @param hasBackdrop indica si tiene fondo el diálogo
 * @param c el compomente que se va a mostrar en el popup
 */
  public openDialog(data: any, size: any, hasBackdrop: boolean, c: any) {
    let dialogRef = this.dialog.open(c, {
      hasBackdrop: hasBackdrop,
      width: size.width,
      height: size.height,
      data: data
    });
    return dialogRef.afterClosed();
  }

  /**
  * Para mostrar en un popup un determinado componente ajustable al contenido de la ventana
  * @param data los datos que recibe el componente   
  * @param hasBackdrop indica si tiene fondo el diálogo
  * @param c el compomente que se va a mostrar en el popup
  * utilizar con css.
  */
  public openDialogResizable(data: any, hasBackdrop: boolean, c: any) {
    let dialogRef = this.dialog.open(c, {
      hasBackdrop: hasBackdrop,
      data: data
    });
    return dialogRef.afterClosed();
  }
}