pragma solidity ^0.4.8;

contract MillionTokenHomepage {

    struct Token {
        uint16 x;
        uint16 y;
        uint8 red;
        uint8 green;
        uint8 blue;
        address owner;
        uint currentBid;
    }

    event NewWinningBid (uint32 index);
    Token[] public tokens;
    //mapping(address => Token[1000000]) public tokens;
    mapping(address => uint32) public ownership;

    function getToken(uint32 i) returns (uint8, uint8, uint8, uint) {
        return (tokens[i].red, tokens[i].green, tokens[i].blue, tokens[i].currentBid);
    }

    function bidOnToken(uint16 _x, uint16 _y, uint8 _red, uint8 _green, uint8 _blue) payable {
        uint32 i = _x*1000 + _y;
        Token token = tokens[i];
        token.x = _x;
        token.y = _y;
        if(msg.value > token.currentBid) {
            address previousOwner = token.owner;
            previousOwner.transfer(token.currentBid);

            token.currentBid = msg.value;
            token.red = _red;
            token.green = _green;
            token.blue = _blue;
            token.owner = msg.sender;

            NewWinningBid(i);
        }
    }
}