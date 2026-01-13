// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title TradeSettlement
 * @dev Immutable post-trade settlement recorder
 */
contract TradeSettlement {

    enum Status { Pending, Settled }

    struct Trade {
        uint256 tradeId;
        address buyer;
        address seller;
        uint256 quantity;
        uint256 price;
        Status status;
        uint256 timestamp;
    }

    mapping(uint256 => Trade) public trades;

    event TradeRecorded(uint256 tradeId, uint256 timestamp);
    event TradeSettled(uint256 tradeId, uint256 timestamp);

    function recordTrade(
        uint256 tradeId,
        address buyer,
        address seller,
        uint256 quantity,
        uint256 price
    ) public {
        require(trades[tradeId].tradeId == 0, "Trade already exists");

        trades[tradeId] = Trade({
            tradeId: tradeId,
            buyer: buyer,
            seller: seller,
            quantity: quantity,
            price: price,
            status: Status.Pending,
            timestamp: block.timestamp
        });

        emit TradeRecorded(tradeId, block.timestamp);
    }

    function settleTrade(uint256 tradeId) public {
        require(trades[tradeId].tradeId != 0, "Trade not found");
        require(trades[tradeId].status == Status.Pending, "Already settled");

        trades[tradeId].status = Status.Settled;

        emit TradeSettled(tradeId, block.timestamp);
    }

    function getTradeStatus(uint256 tradeId) public view returns (Status) {
        return trades[tradeId].status;
    }
}
