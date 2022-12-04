using UnityEngine;

public class Piece : MonoBehaviour
{
    public Board board { get; private set; }
    public TetrominoData data { get; private set; }
    public Vector3Int[] cells { get; private set; }
    public Vector3Int position { get; private set; }

    private int rotationIndex = 0;

    public float stepDelay = 0.5f;
    //public float moveDelay = 0.1f;
    public float lockDelay = 0.5f;

    private float stepTime;
    //private float moveTime;
    private float lockTime;

    public void Initialize(Board board, Vector3Int position, TetrominoData data)
    {
        this.board = board;
        this.position = position;
        this.data = data;

        stepTime = Time.time + stepDelay;

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
        
        lockTime += Time.deltaTime;

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

        if (Time.time > stepTime)
        {
          Step();
	    }

        board.Set(this);
    }

    public void Rotate(int direction)
    {
        // Store the current rotation in case the rotation fails
        // and we need to revert
        int originalRotation = rotationIndex;

        // Rotate all of the cells using a rotation matrix
        rotationIndex = Clamp(0,4, rotationIndex + direction);
        ApplyRotation(direction);

        // Revert the rotation if the wall kick tests fail
        if (!CheckWallkick(rotationIndex, direction))
        {
            rotationIndex = originalRotation;
            ApplyRotation(-direction);
        }
    }
    
    public bool CheckWallkick(int rotationIndex, int direction)
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

        return Clamp(0, data.wallKicks.GetLength(0), wallKickIndex);
    }

    public void ApplyRotation(int direction)
    {

        float[] matrix = Data.RotationMatrix;

        // Rotate all of the cells using the rotation matrix
        for (int i = 0; i < cells.Length; i++)
        {
            Vector3 cell = cells[i];

            int x, y;

            switch (data.tetromino)
            {
                case Tetromino.I:
                case Tetromino.O:
                    // "I" and "O" are rotated from an offset center point
                    cell.x -= 0.5f;
                    cell.y -= 0.5f;
                    x = Mathf.CeilToInt((cell.x * matrix[0] * direction) + (cell.y * matrix[1] * direction));
                    y = Mathf.CeilToInt((cell.x * matrix[2] * direction) + (cell.y * matrix[3] * direction));
                    break;

                default:
                    x = Mathf.RoundToInt((cell.x * matrix[0] * direction) + (cell.y * matrix[1] * direction));
                    y = Mathf.RoundToInt((cell.x * matrix[2] * direction) + (cell.y * matrix[3] * direction));
                    break;
            }

            cells[i] = new Vector3Int(x, y, 0);
        }
    }

    public Vector3Int Rotate90(int direction, Vector3 position)
    {
        float x = -1 * direction * position.y;
        float y = direction * position.x;

        return new Vector3Int((int)x, (int)y, 0);
    }

    public void Step()
    {
        stepTime = Time.time + stepDelay;

        Move(Vector2Int.down);

        if (lockTime > lockDelay)
        {
            Lock();
        }
    }

    public void Lock()
    {
        board.Set(this);
        board.ClearLines();
        board.SpawnPiece();
    }
      
    public int Clamp(int min, int max, int num)
    {
        if (num < min)
        {
            return max - (min - num) % (max - min);
        }
        else
        {
            return min + (num - min) % (max - min);
        }
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
            lockTime = 0f;
        }

        return isValid;
    }

    public void hardDrop()
    {
        while (Move(Vector2Int.down))
        {
            continue;
        }

        Lock();
    }

}
