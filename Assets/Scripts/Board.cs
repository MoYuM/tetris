using UnityEngine;
using UnityEngine.Tilemaps;

public class Board : MonoBehaviour
{
    public Tilemap tilemap { get; private set; }
    public Piece activePiece { get; private set; }

    public TetrominoData[] tetrominoes;
    public Vector2Int boardSize = new Vector2Int(10, 20);
    public Vector3Int spawnPosition = new Vector3Int(-1, 8, 0);

    public RectInt Bounds
    {
        get
        {
            Vector2Int position = new Vector2Int(-boardSize.x / 2, -boardSize.y / 2);
            return new RectInt(position, boardSize);
        }
    }

    private void Awake()
    {
        tilemap = GetComponentInChildren<Tilemap>();
        activePiece = GetComponentInChildren<Piece>();

        for (int i = 0; i < tetrominoes.Length; i++)
        {
            tetrominoes[i].Initialize();
        }
    }

    private void Start()
    {
        SpawnPiece();
    }

    public void SpawnPiece()
    {
        int random = Random.Range(0, tetrominoes.Length);
        TetrominoData data = tetrominoes[random];

        activePiece.Initialize(this, spawnPosition, data);

        if(IsValidPosition(activePiece,spawnPosition))
        {
            Set(activePiece);
	    } else {
            GameOver();
	    }
    }

    public void GameOver()
    {
        tilemap.ClearAllTiles();
    }

    public void Set(Piece piece)
    {
        for (int i = 0; i < piece.cells.Length; i++)
        {
            Vector3Int tilePosition = piece.cells[i] + piece.position;
            tilemap.SetTile(tilePosition, piece.data.tile);
        }
    }

    public void Clear(Piece piece)
    {
        for (int i = 0; i < piece.cells.Length; i++)
        {
            Vector3Int tilePosition = piece.cells[i] + piece.position;
            tilemap.SetTile(tilePosition, null);
        }
    }

    public void ClearLines()
    {
        RectInt bounds = Bounds;
        int row = bounds.yMin;

        while(row < bounds.yMax)
        { 
            if (isFullRow(row))
            {
                ClearLine(row);        
	        } 
	        else
            {
                row++;
	        }
	    }
    }

    public void ClearLine(int row)
    {
        RectInt bounds = Bounds;
        int _row = row;

        for(int col = bounds.xMin; col < bounds.xMax; col ++)
        {
            Vector3Int position = new Vector3Int(col, row, 0);
            tilemap.SetTile(position, null);
	    }

        while(_row < bounds.yMax)
        { 
            for(int col = bounds.xMin; col < bounds.xMax; col ++)
            {
                Vector3Int position = new Vector3Int(col, _row + 1, 0);
                TileBase aboveTile = tilemap.GetTile(position);

                position = new Vector3Int(col, _row, 0);
                tilemap.SetTile(position, aboveTile);
	        }

            _row++;
	    }
    }

    public bool isFullRow(int row)
    {
        RectInt bounds = Bounds;

        for(int i = bounds.xMin; i < bounds.xMax; i ++)
        {
            Vector3Int position = new Vector3Int(i, row, 0);

            if (!tilemap.HasTile(position))
            {
                return false;
	        }
	    }

        return true;
    }

    public bool IsValidPosition(Piece piece, Vector3Int position)
    {
        RectInt bounds = Bounds;
        // The position is only valid if every cell is valid
        for (int i = 0; i < piece.cells.Length; i++)
        {
            Vector3Int tilePosition = piece.cells[i] + position;

            // An out of bounds tile is invalid
            if (!bounds.Contains((Vector2Int)tilePosition))
            {
                return false;
            }

            // A tile already occupies the position, thus invalid
            if (tilemap.HasTile(tilePosition))
            {
                return false;
            }
        }

        return true;
    }
}
