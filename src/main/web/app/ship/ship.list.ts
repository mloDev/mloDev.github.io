'use strict';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {ShipService} from '../service/ship.service';
import { Ship } from '../model/ship';
import { ShipTypePipe } from '../pipes/ship-type-pipe';
import { ShipFactionPipe } from '../pipes/ship-faction-pipe';
import { FactionSelector } from '../selector/faction-selector';
import { ShipDetailSmall } from "../ship/ship.detail.small";
import { Dragula, DragulaService} from 'ng2-dragula/ng2-dragula';
import { DND_DIRECTIVES } from 'ng2-dnd/ng2-dnd';

@Component({
    selector: 'ship-list',
    pipes: [ShipTypePipe, ShipFactionPipe ],
    templateUrl: 'app/ship/ship.list.html',
    providers: [ShipService],
    directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, FactionSelector, ShipDetailSmall, DND_DIRECTIVES, Dragula]
})
export class ShipList implements OnInit {

    @Input() @Output() faction;
    
    @Input() shipType;
    
    @Input() @Output() public ships: Ship [];
    
    @Output() lightShips: Ship [];
    @Output() mediumShips: Ship [];
    @Output() heavyShips: Ship [];
    @Output() superHeavyShips: Ship [];
    
    @Output() shipChange = new EventEmitter();

  constructor(
    private shipService: ShipService) { }

    
  getShips() {
    this.shipService
        .getShips()
        .then(ships => this.ships = ships);
  }
    
  ngOnInit() {
    this.getShips();
  }
    
  setShip(ship) {
    this.shipChange.emit(
        ship)  
  }
}