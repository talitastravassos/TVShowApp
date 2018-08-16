import { MovieProvider } from './../../providers/movie/movie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SerieDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-serie-detalhes',
  templateUrl: 'serie-detalhes.html',
  providers: [
    MovieProvider
  ]
})
export class SerieDetalhesPage {
  public tvshow;
  public tvshowid;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public tvShowProvider: MovieProvider
  ) {
  }

  ionViewDidEnter() {
    
    this.tvshowid = this.navParams.get("id");
    console.log("Serie ID recebido: " + this.tvshowid);

    this.tvShowProvider.getShowDetails(this.tvshowid).subscribe(data => {
      let retorno = (data as any)._body;
      this.tvshow = JSON.parse(retorno);
    }, error => {
      console.log(error);
    })
  }

}
