var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var TrainerListFilterPipe = (function () {
    function TrainerListFilterPipe() {
    }
    TrainerListFilterPipe.prototype.transform = function (list, filter, limit) {
        if (!list) {
            return list;
        }
        var shownSessions = 0;
        var queryText = filter.toLowerCase().replace(/,|\.|-/g, ' ');
        var queryWords = queryText.split(' ').filter(function (w) { return w.trim().length; });
        list.forEach(function (trainer) {
            trainer.hide = false;
            var matchesQueryText = false;
            if (queryWords.length) {
                // of any query word is in the trainer name or lastname than it passes the query test
                queryWords.forEach(function (queryWord) {
                    if (trainer.name.toLowerCase().indexOf(queryWord) > -1 || trainer.lastname.toLowerCase().indexOf(queryWord) > -1 || (trainer.alias && trainer.alias.toLowerCase().indexOf(queryWord) > -1)) {
                        matchesQueryText = true;
                    }
                });
            }
            else {
                // if there are no query words then this trainer passes the query test
                matchesQueryText = true;
            }
            if (!matchesQueryText) {
                trainer.hide = true;
            }
            else {
                shownSessions++;
            }
        });
        return list.slice(0, limit);
    };
    return TrainerListFilterPipe;
}());
TrainerListFilterPipe = __decorate([
    Pipe({
        name: 'filterTrainers',
        pure: false
    })
], TrainerListFilterPipe);
export { TrainerListFilterPipe };
//# sourceMappingURL=trainer-list-filter-pipe.js.map