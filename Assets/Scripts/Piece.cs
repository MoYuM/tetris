using System;
using UnityEngine;

public class Piece : MonoBehaviour
{
    public Board board { get; private set; }
    public TetrominoData data { get; private set; }
    public Vector3Int[] cells { get; private set; }
    public Vector3Int position { get; private set; }
    private int rotationIndex = 0;

    public void Initialize(Board board, Vector3Int position, TetrominoData data)
    {
        this.board = board;
        this.position = position;
        this.data = data;

        if (cells == null)
        {
            cells = new Vector3Int[data.cells.Length];
        }

        // grip the data from TetrominoData into Piece
        for (int i = 0; i < cells.Length; i++)
        {
            cells[i] = (Vector3Int)data.cells[i];
        }
    }

    private void Update()
    {

        board.Clear(this);

        if (Input.GetKeyDown(KeyCode.Q))
        {
            Rotate(-1);
        }

        if (Input.GetKeyDown(KeyCode.E))
        {
            Rotate(1);
        }

        if (Input.GetKeyDown(KeyCode.A))
        {
            Move(Vector2Int.left);
        }

        if (Input.GetKeyDown(KeyCode.D))
        {
            Move(Vector2Int.right);
        }

        if (Input.GetKeyDown(KeyCode.S))
        {
            Move(Vector2Int.down);
        }

        if (Input.GetKeyDown(KeyCode.Space))
        {
            hardDrop();
        }

        board.Set(this);
    }

    public void Rotate(int direction)
    {
        int originRotationIndex = rotationIndex;

        rotationIndex += direction;
        rotationIndex = Clamp(0, cells.Length, rotationIndex);

        ApplyRotation(direction);

        if (!checkWallkick(rotationIndex, direction)) {
            ApplyRotation(-direction);
            rotationIndex = originRotationIndex;
	    }
    }
    
    public bool checkWallkick(int rotationIndex, int direction)
    {
        int wallKickIndex = getWallKickIndex(rotationIndex, direction);

        for(int i = 0; i < data.wallKicks.GetLength(1); i ++)
        {

            Vector2Int translation = data.wallKicks[wallKickIndex, i];
	        
            if (Move(translation)) {
                return true;
	        }

	    }

        return false;
    }

    private int getWallKickIndex(int rotationIndex,int direction)
    {
        int wallKickIndex = rotationIndex * 2;

        if (direction < 0) {
            wallKickIndex--;
	    }

        return wallKickIndex;
    }

    public void ApplyRotation(int direction)
    { 
        
        for (int i = 0; i < cells.Length; i++)
        {
            Vector3 cell = cells[i];

            switch (data.tetromino)
            {
                case Tetromino.I:
                case Tetromino.O:
                    cell.x += 0.5f;
                    cell.y += 0.5f;

                    cells[i] = Rotate90(direction, cell);

                    break;

                default:

                    cells[i] = Rotate90(direction, cell);
                    break;
            }
        }
    }

    public Vector3Int Rotate90(int direction, Vector3 position)
    {
        float x = -1 * direction * position.y;
        float y = direction * position.x;

        return new Vector3Int((int)x, (int)y, 0);
    }

    public int Clamp(int min, int max, int num)
    {
        if (num > max)
        {
            return min;
        }

        if (num < min)
        {
            return max;
        }

        return num;
    }


    public bool Move(Vector2Int translation)
    {
        Vector3Int newPosition = position;
        newPosition.x += translation.x;
        newPosition.y += translation.y;

        bool isValid = board.IsValidPosition(this, newPosition);

        if (isValid)
        {
            this.position = newPosition;
        }

        return isValid;
    }

    public void hardDrop()
    {
        while (Move(Vector2Int.down))
        {
            continue;
        }
    }

}
