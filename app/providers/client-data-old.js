import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {UserData} from './user-data';


@Injectable()
export class ClientData {
  constructor(http: Http, user: UserData) {
    // inject the Http provider and set to this instance
    this.http = http;
    this.user = user;

    // Attach an asynchronous callback to read the data at our posts reference
    // this.apiRef = new Firebase('https://fiery-heat-1991.firebaseio.com/clients');
    // this.apiRef.on('value', function(snapshot) {
    //   console.log(snapshot.val());
    // }, function (errorObject) {
    //   console.log('The read failed: ' + errorObject.code);
    // });
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('data/data.json').subscribe(res => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = this.processData(res.json());
        resolve(this.data);
      });
    });
  }

  processData(data) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions

    data.tracks = [];

    // loop through each client
    data.clients.forEach(client => {
      // loop through each cycle in the client
      client.cycles.forEach(cycle => {
        // loop through each training group in the cycle
        cycle.trainings.forEach(training => {
          // loop through each training in the timeline group
          training.exercises.forEach(exercise => {
            // this.processExercise(data, exercise);
          });
        });
      });
    });

    return data;
  }

  processSession(data, session) {
    // loop through each speaker and load the speaker data
    // using the speaker name as the key
    session.speakers = [];
    if (session.speakerNames) {
      session.speakerNames.forEach(speakerName => {
        let speaker = data.speakers.find(s => s.name === speakerName);
        if (speaker) {
          session.speakers.push(speaker);
          speaker.sessions = speaker.sessions || [];
          speaker.sessions.push(session);
        }
      });
    }

    if (session.tracks) {
      session.tracks.forEach(track => {
        if (data.tracks.indexOf(track) < 0) {
          data.tracks.push(track);
        }
      });
    }
  }

  getTimeline(queryText='', excludeTracks=[], segment='all') {
    return this.load().then(data => {
      let clients = data.clients;
      clients.forEach(client => {
        queryText = queryText.toLowerCase().replace(/,|\.|-/g,' ');
        let queryWords = queryText.split(' ').filter(w => w.trim().length);

        client.cycles.forEach(cycle => {
          cycle.hide = true;

          cycle.trainings.forEach(training => {
            // check if this session should show or not
            // this.filterSession(session, queryWords, excludeTracks, segment);

            if (!training.hide) {
              // if this session is not hidden then this group should show
              cycle.hide = false;
              client.shownSessions++;
            }
          });

        });
      });
      return {
        clients: clients
      };
    });
  }

  getClientTimeline(clientIndex, queryText='', excludeTracks=[], segment='all') {
    return this.load().then(data => {
      let client = data.clients[clientIndex];
      client.shownSessions = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g,' ');
      let queryWords = queryText.split(' ').filter(w => w.trim().length);

      client.cycles.forEach(cycle => {
        cycle.hide = true;

        cycle.trainings.forEach(training => {
          // check if this session should show or not
          // this.filterSession(session, queryWords, excludeTracks, segment);

          if (!training.hide) {
            // if this session is not hidden then this group should show
            cycle.hide = false;
            client.shownSessions++;
          }
        });

      });

      return client;
    });
  }

  filterSession(session, queryWords, excludeTracks, segment) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach(queryWord => {
        if (session.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    let matchesTracks = false;
    session.tracks.forEach(trackName => {
      if (excludeTracks.indexOf(trackName) === -1) {
        matchesTracks = true;
      }
    });

    // if the segement is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    let matchesSegment = false;
    if (segment === 'favorites') {
      if (this.user.hasFavorite(session.name)) {
        matchesSegment = true;
      }
    } else {
      matchesSegment = true;
    }

    // all tests must be true if it should not be hidden
    session.hide = !(matchesQueryText && matchesTracks && matchesSegment);
  }

  getSpeakers() {
    return this.load().then(data => {
      return data.speakers.sort((a, b) => {
        let aName = a.name.split(' ').pop();
        let bName = b.name.split(' ').pop();
        return aName.localeCompare(bName);
      });
    });
  }

  getTracks() {
    return this.load().then(data => {
      return data.tracks.sort();
    });
  }

  getMap() {
    return this.load().then(data => {
      return data.map;
    });
  }

}
