WITH RECURSIVE RecursiveCheck AS (
    SELECT from_activity_id, to_activity_id
    FROM activity_connections
    WHERE from_activity_id = ?  -- Specify the starting activity ID
    UNION ALL
    SELECT ac.from_activity_id, ac.to_activity_id
    FROM activity_connections ac
    INNER JOIN RecursiveCheck rc ON ac.from_activity_id = rc.to_activity_id
)
SELECT *
FROM RecursiveCheck
WHERE from_activity_id = ?