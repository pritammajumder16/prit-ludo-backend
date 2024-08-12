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
  styleUrls: ['./ludo-logic.component.scss'],
})
export class LudoLogicComponent {
  public currentPlayer = 'P1';
  public diceValue!: number;
  public gameOver = false;
  private hasValidMove = false;

  @ViewChildren('playerPiece') playerPieceQL!: QueryList<ElementRef>;
  public positions = {
    P1: [...BASE_POSITIONS.P1],
    P2: [...BASE_POSITIONS.P2],
  };

  ngAfterViewInit() {
    this.initializePiecePositions();
  }

  private initializePiecePositions() {
    PLAYERS.forEach((player: string) => {
      this.positions[player as keyof typeof this.positions].forEach(
        (position, pieceIndex) => {
          this.setPiecePosition(
            player as keyof typeof PLAYERS,
            pieceIndex,
            position
          );
        }
      );
    });
  }

  public onDiceRoll = () => {
    if (this.gameOver || this.hasValidMove) return;

    this.diceValue = Math.floor(Math.random() * 6) + 1;
    console.log(`${this.currentPlayer} rolled a ${this.diceValue}`);
    this.highlightValidPieces(this.diceValue);

    if (!this.hasValidMove) {
      this.endTurn();
    }
  };

  private highlightValidPieces(diceValue: number) {
    this.hasValidMove = false;
    let currentPositions =
      this.positions[this.currentPlayer as keyof typeof this.positions];
    currentPositions.forEach((pos, index) => {
      const isAtBase =
        BASE_POSITIONS[
          this.currentPlayer as keyof typeof BASE_POSITIONS
        ].includes(pos);
      if (isAtBase && diceValue === 6) {
        this.toggleHighlight(index, true);
        this.hasValidMove = true;
      } else if (!isAtBase) {
        this.toggleHighlight(index, true);
        this.hasValidMove = true;
      } else {
        this.toggleHighlight(index, false);
      }
    });
  }

  private toggleHighlight(pieceIndex: number, highlight: boolean) {
    const pieceElement = this.playerPieceQL.find(
      (el) =>
        el.nativeElement.getAttribute('playerId') === this.currentPlayer &&
        el.nativeElement.getAttribute('piece') === pieceIndex.toString()
    );
    if (pieceElement) {
      pieceElement.nativeElement.className = highlight
        ? 'highlight player-piece'
        : 'player-piece';
    }
  }

  public onPieceClick(pieceIndex: number) {
    const pieceElement = this.playerPieceQL.toArray()[pieceIndex];
    if (pieceElement.nativeElement.classList.contains('highlight')) {
      this.movePiece(
        this.currentPlayer as keyof typeof PLAYERS,
        pieceIndex,
        this.diceValue
      );
      this.hasValidMove = false;
      this.endTurn();
    }
  }

  private movePiece(
    player: keyof typeof PLAYERS,
    pieceIndex: number,
    diceValue: number
  ) {
    let currentPosition =
      this.positions[player as keyof typeof this.positions][pieceIndex];

    if (
      BASE_POSITIONS[player as keyof typeof BASE_POSITIONS].includes(
        currentPosition
      )
    ) {
      if (diceValue === 6) {
        currentPosition =
          START_POSITIONS[player as keyof typeof START_POSITIONS];
      } else {
        return;
      }
    } else {
      currentPosition += diceValue;

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

      if (
        currentPosition ===
        HOME_POSITIONS[player as keyof typeof HOME_POSITIONS]
      ) {
        console.log(`${player.toString()} won!`);
        this.gameOver = true;
        return;
      }
    }

    this.positions[player as keyof typeof this.positions][pieceIndex] =
      currentPosition;
    this.setPiecePosition(player, pieceIndex, currentPosition);
  }

  private setPiecePosition(
    player: keyof typeof PLAYERS,
    pieceIndex: number,
    position: number
  ) {
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
  }

  private endTurn() {
    this.clearHighlights();
    if (this.diceValue !== 6) {
      this.currentPlayer = this.currentPlayer === 'P1' ? 'P2' : 'P1';
    }
    console.log(`Next turn: ${this.currentPlayer}`);
  }

  private clearHighlights() {
    this.playerPieceQL.forEach((el) => {
      el.nativeElement.className = 'player-piece';
    });
  }
}
