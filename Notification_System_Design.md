# Stage 1: Notification System Design

## Core Approach
To efficiently present a "Priority Inbox" containing the top 10 unread notifications, the system evaluates priority using a composite strategy:
1. **Category Weight:** `placement` (Weight: 3) > `result` (Weight: 2) > `event` (Weight: 1).
2. **Recency:** If two notifications share identical category weights, the newest notification (higher timestamp) takes precedence.

## Maintaining the Top 10 Efficiently
Instead of sorting a massive array of notifications every time a new one arrives (which is $O(N \log N)$), this system acts like a **Bounded Min-Heap / Priority Queue** capped at size 10:
* **Insertion & Eviction:** When a new notification arrives, it is added to the list. If the count exceeds 10, the lowest-priority notification (the minimum element) is immediately discarded (`shift()`).
* **Efficiency:** Because the active list size never crosses 11, the sorting/eviction operations take effectively constant time $O(1)$ relative to total notification volume, making it highly scalable for endless real-time streams.