from enum import Enum


class TransactionState(Enum):
    REJECTED = "REJECTED"
    IN_PROGRESS = "IN_PROGRESS"
    DONE = "DONE"
    WAITING_FOR_USER = "WAITING_FOR_USER"
