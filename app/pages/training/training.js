import {Page} from 'ionic/ionic';
import {ConferenceData} from '../../providers/conference-data';


@Page({
  templateUrl: 'build/pages/training/training.html'
})
export class TrainingPage {
  constructor(confData: ConferenceData) {
    this.confData = confData;
  }

  onPageLoaded() {
    this.confData.getClients().then(clientsData => {
      let clientsEle = document.getElementById('clients');

      

      // let map = new google.maps.Map(mapEle, {
      //   center: mapData.find(d => d.center),
      //   zoom: 16
      // });

      // mapData.forEach(markerData => {
      //   let infoWindow = new google.maps.InfoWindow({
      //     content: `<h5>${markerData.name}</h5>`
      //   });

      //   let marker = new google.maps.Marker({
      //     position: markerData,
      //     map: map,
      //     title: markerData.name
      //   });

      //   marker.addListener('click', () => {
      //     infoWindow.open(map, marker);
      //   });
      // });

      // google.maps.event.addListenerOnce(map, 'idle', () => {
      //   mapEle.classList.add('show-map');
      // });

    });
  }
}
