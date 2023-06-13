// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@rarible/royalties/contracts/impl/RoyaltiesV2Impl.sol";
import "@rarible/lazy-mint/contracts/erc-721/LibERC721LazyMint.sol";

contract Ticket is ERC721, RoyaltiesV2Impl {
  using Counters for Counters.Counter;

  /* Structs */
  struct Event {
    address payable creator;
    string id;
    string title;
    uint256 startDate;
    string metadata;
    bool active;
    string childAddress;
    string[] category;
    Image image;
    string eventHost;
    uint256 fee;
    string date;
    Desc description;
    uint256 seats;
    string owner;
    string eventType;
    Venue venue;
    string[] buyers;
    uint256 ticketsAvailable;
    uint256 ticketsSold;
    string link;
    string displayName;
    string profileImage;
  }

  struct Image {
    string url;
    uint256 width;
    uint256 height;
  }

  struct Desc {
    string short;
    string long;
  }

  struct Venue {
    string name;
    string location;
    uint256 capacity;
    string url;
  }

  struct TicketCategory {
    bool exist;
    uint256 eventId;
    uint256 price;
    uint256 quantity;
  }

  /* Variables */
  Counters.Counter private _tokenIds;
  mapping(uint256 => Event) public events;
  mapping(uint256 => TicketCategory) public ticketCategories;

  /* Events */
  event EventCreated(uint256 eventId, address creator);
  event TicketCategoryAdded(uint256 eventId, uint256 ticketCategoryId);

  /* Constructor */
  constructor() ERC721("EVENTWRITE", "W3V") {}

  /* Modifiers */
  //Modifier to check if event exist
  modifier eventExists(uint256 _eventId) {
    require(events[_eventId].active, "Event does not exist.");
    _;
  }

  //Modifier to check if ticket category exist
  modifier ticketCategoryExist(uint256 _ticketCategory) {
    require(ticketCategories[_ticketCategory].exist, "Ticket category does not exist.");
    _;
  }

  //Modifier to check if ticket category is for that event
  modifier ticketCategoryEventExist(uint256 _eventId, uint256 _ticketCategory) {
    require(
      ticketCategories[_ticketCategory].eventId == _eventId,
      "Ticket category does not exist."
    );
    _;
  }

  // Modifier to check that the caller is the owner of event
  modifier onlyEventOwner(uint256 _eventId) {
    Event memory _event = events[_eventId];
    require(msg.sender == _event.creator, "Not event owner.");
    _;
  }

  // Modifier to check that the caller is not the owner of event
  modifier isNotEventOwner(uint256 _eventId) {
    Event memory _event = events[_eventId];
    require(msg.sender != _event.creator, "Caller is event owner.");
    _;
  }

  /* Functions */
  function addEvent(
    string memory _title,
    uint256 _startDate,
    string memory _metadata,
    string memory _childAddress,
    string[] memory _category,
    string memory _image,
    string memory _eventHost,
    uint256 _fee,
    string memory _date,
    string memory _description,
    uint256 _seats,
    string memory _owner,
    string memory _type,
    Venue memory _venue,
    string[] memory _buyers,
    uint256 _ticketsAvailable,
    uint256 _ticketsSold,
    string memory _link,
    string memory _displayName,
    string memory _profileImage
  ) public returns (uint256) {
    require(bytes(_title).length > 0, "Title cannot be empty.");
    require(_startDate > block.timestamp, "Start date must be in the future.");
    require(bytes(_metadata).length > 0, "Metadata cannot be empty.");
    require(bytes(_eventHost).length > 0, "Event host cannot be empty.");
    require(_fee > 0, "Fee must be greater than 0.");
    require(bytes(_date).length > 0, "Date cannot be empty.");
    require(bytes(_description).length > 0, "Description cannot be empty.");
    require(_seats > 0, "Seats must be greater than 0.");
    require(bytes(_owner).length > 0, "Owner cannot be empty.");
    require(bytes(_type).length > 0, "Type cannot be empty.");
    require(_ticketsAvailable > 0, "Tickets available must be greater than 0.");

    _tokenIds.increment();
    uint256 tokenId = _tokenIds.current();

    _mint(msg.sender, tokenId);

    events[tokenId] = Event(
      payable(msg.sender),
      tokenId,
      _title,
      _startDate,
      _metadata,
      true,
      _childAddress,
      _category,
      Image(_image),
      _eventHost,
      _fee,
      _date,
      Desc(_description),
      _seats,
      _owner,
      _type,
      _venue,
      _buyers,
      _ticketsAvailable,
      _ticketsSold,
      _link,
      _displayName,
      _profileImage
    );

    emit EventAdded(tokenId, _title, _startDate, _eventHost, _ticketsAvailable, _category);

    return tokenId;
  }

  function updateEvent(
    uint256 _eventId,
    string memory _title,
    uint256 _startDate,
    string memory _metadata,
    bool _active,
    string memory _childAddress,
    string[] memory _category,
    Image memory _image,
    string memory _eventHost,
    uint256 _fee,
    string memory _date,
    Desc memory _description,
    uint256 _seats,
    string memory _owner,
    string memory _type,
    Venue memory _venue,
    string[] memory _buyers,
    uint256 _ticketsAvailable,
    uint256 _ticketsSold,
    string memory _link,
    string memory _displayName,
    string memory _profileImage
  ) public onlyEventOwner(_eventId) {
    Event storage _event = events[_eventId];
    _event.title = _title;
    _event.startDate = _startDate;
    _event.metadata = _metadata;
    _event.active = _active;
    _event.childAddress = _childAddress;
    _event.category = _category;
    _event.image = _image;
    _event.eventHost = _eventHost;
    _event.fee = _fee;
    _event.date = _date;
    _event.description = _description;
    _event.seats = _seats;
    _event.owner = _owner;
    _event.type = _type;
    _event.venue = _venue;
    _event.buyers = _buyers;
    _event.tickets_available = _ticketsAvailable;
    _event.tickets_sold = _ticketsSold;
    _event.link = _link;
    _event.displayName = _displayName;
    _event.profileImage = _profileImage;
    
    emit EventUpdated(_eventId, _event);
  }

function addTicketCategory(
    uint256 _eventId,
    string memory _categoryName,
    uint256 _price,
    uint256 _totalTickets
) public onlyEventOwner(_eventId) eventExists(_eventId) {
    TicketCategory storage ticketCategory = ticketCategories[_tokenIds.current()];

    ticketCategory.categoryName = _categoryName;
    ticketCategory.price = _price;
    ticketCategory.totalTickets = _totalTickets;
    ticketCategory.eventId = _eventId;
    ticketCategory.exist = true;

    _tokenIds.increment();
}

  function mintTicket(
      uint256 _eventId,
      uint256 _ticketCategoryId,
      string memory _tokenURI,
      address payable _to,
      LibERC721LazyMint.Mint721Data memory _data
  ) public payable {
      TicketCategory memory ticketCategory = ticketCategories[_ticketCategoryId];

      require(ticketCategory.exist, "Ticket category does not exist.");
      require(ticketCategory.totalTickets > ticketCategory.soldTickets, "Sold out.");
      require(msg.value >= ticketCategory.price, "Insufficient amount.");

      ticketCategory.soldTickets++;

      uint256 tokenId = _tokenIds.current();
      _safeMint(_to, tokenId);
      _setTokenURI(tokenId, _tokenURI);

      LibERC721LazyMint.ERC721LazyMint(address(this)).mintAndTransfer(_data, tokenId, _to);

      events[_eventId].buyers.push(_to);
      events[_eventId].tickets_sold++;

      // Transfer the ticket price to the event creator
      events[_eventId].creator.transfer(ticketCategory.price);

      // Transfer any excess amount back to the buyer
      if (msg.value > ticketCategory.price) {
          payable(msg.sender).transfer(msg.value - ticketCategory.price);
      }
  }

  function  getTicketCategories(uint256 _eventId)
    public
    view
    eventExists(_eventId)
    returns (TicketCategory[] memory)
  {
      TicketCategory[] memory categories = new TicketCategory[](uint256(_tokenIds.current()));

      uint256 categoryCount = 0;
      for (uint256 i = 0; i < _tokenIds.current(); i++) {
          if (
              ticketCategories[i].exist &&
              ticketCategories[i].eventId == _eventId &&
              ticketCategories[i].totalTickets > ticketCategories[i].soldTickets
          ) {
              categories[categoryCount] = ticketCategories[i];
              categoryCount++;
          }
      }

      assembly {
          mstore(categories, categoryCount)
      }

      return categories;

  }

  function getEvent(uint256 _eventId)
      public
      view
      eventExists(_eventId)
      returns (Event memory)
  {
      return events[_eventId];
  }
}
