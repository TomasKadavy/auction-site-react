const serverApiURL = "http://localhost:8000/api/";

export const apiGetAuctions = (sortType?: string) => {
  const options = sortType ? "?sort=" + sortType : "";
  return serverApiURL + "auctions" + options;
};

export const apiGetAuction = (id: string) => {
  return serverApiURL + "auction/" + id;
};

export const apiGetAuctionsWhereUserHasABid = (name: string) => {
  return serverApiURL + "user/" + name + "/auctions-bid";
};

export const apiGetAuctionsOwnedByUser = (name: string) => {
  return serverApiURL + "user/" + name + "/auctions";
};

export const apiGetAuctionsByLeader = (name: string) => {
  return serverApiURL + "user/" + name + "/leader";
};

export const apiPostRegister = serverApiURL + "register";

export const apiPostLogin = serverApiURL + "login";

export const apiPostMakeBid = serverApiURL + "bid";

export const apiPostCreateAuction = serverApiURL + "auction";
