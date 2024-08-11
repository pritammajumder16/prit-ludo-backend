import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {
  BASE_POSITIONS,
  COORDINATES_MAP,
  HOME_ENTRANCE,
  HOME_POSITIONS,
  PLAYERS,
  START_POSITIONS,
  X_STEP_LENGTH,
  Y_STEP_LENGTH,
  TURNING_POINTS,
} from '../../constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ludo-logic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ludo-logic.component.html',
  styleUrl: './ludo-logic.component.scss',
})
export class LudoLogicComponent {
  @ViewChildren('playerPiece') playerPieceQL!: QueryList<ElementRef>;
  public positions: { [key: string]: number[] } = {
    P1: [...BASE_POSITIONS.P1],
    P2: [...BASE_POSITIONS.P2],
  };
  ngAfterViewInit() {
    this.initializePiecePositions();
  }

  // Set all pieces to their initial base positions
  private initializePiecePositions() {
    PLAYERS.forEach((player) => {
      this.positions[player].forEach((position, pieceIndex) => {
        this.setPiecePosition(player, pieceIndex, position);
      });
    });
  }

  public onDiceRoll = () => {
    const diceValue = 6;
    const player = 'P1'; // You would dynamically determine the current player
    const piece = 0; // You would select this dynamically based on user input or AI
    console.log(diceValue);
    this.movePiece(player, piece, diceValue);
  };
  public movePiece = (
    player: string,
    pieceIndex: number,
    diceValue: number
  ) => {
    let currentPosition = this.positions[player][pieceIndex];
    console.log('currentPosition', currentPosition);
    // If piece is in the base, it should start at START_POSITIONS
    if (
      BASE_POSITIONS[player as keyof typeof BASE_POSITIONS].includes(
        currentPosition
      )
    ) {
      if (diceValue === 6) {
        currentPosition =
          START_POSITIONS[player as keyof typeof START_POSITIONS];
      } else {
        // Do nothing if the piece is in the base and dice is not 6
        return;
      }
    } else {
      // Move the piece forward by diceValue
      currentPosition += diceValue;

      // Handle wrapping around the board
      if (
        currentPosition > TURNING_POINTS[player as keyof typeof TURNING_POINTS]
      ) {
        currentPosition =
          HOME_ENTRANCE[player as keyof typeof HOME_ENTRANCE][
            currentPosition -
              TURNING_POINTS[player as keyof typeof TURNING_POINTS] -
              1
          ];
      }

      // If the piece has reached the home position
      if (
        currentPosition ===
        HOME_POSITIONS[player as keyof typeof HOME_POSITIONS]
      ) {
        // Handle reaching home
      }
    }

    // Update the position
    this.positions[player][pieceIndex] = currentPosition;
    console.log('position', currentPosition);
    // Apply the new position using coordinates
    this.setPiecePosition(player, pieceIndex, currentPosition);
  };

  public setPiecePosition = (
    player: string,
    pieceIndex: number,
    position: number
  ) => {
    if (position in COORDINATES_MAP) {
      const [x, y] = COORDINATES_MAP[position as keyof typeof COORDINATES_MAP];

      const pieceElement = this.playerPieceQL.find(
        (el) =>
          el.nativeElement.getAttribute('playerId') === player &&
          el.nativeElement.getAttribute('piece') === pieceIndex.toString()
      );

      if (pieceElement) {
        pieceElement.nativeElement.style.transform = `translate(${
          x * X_STEP_LENGTH
        }px, ${y * Y_STEP_LENGTH}px)`;
      }
    } else {
      console.error(`Invalid position: ${position}`);
    }
  };
}
