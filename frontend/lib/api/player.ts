import axios from "./axiosInstance";

const bearer = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getFirstQuestion = async (token: string, gameId: string) => {
  const res = await axios.post(
    `/players/first-question?gameId=${gameId}`,
    {},
    bearer(token)
  );
  return res.data;
};

export const submitPlayerAnswer = async (
  token: string,
  data: { gameId: string; userId: string; questionId: string; optionId: string }
) => {
  const res = await axios.post("/players/player-answer", data, bearer(token));
  return res.data;
};

export const leavePlayerGame = async (
  token: string,
  gameId: string,
  userId: string
) => {
  const res = await axios.post(
    "/players/player-leave",
    { gameId, userId },
    bearer(token)
  );
  return res.data;
};

export const sendPlayerRequest = async (gameId: string, token: string) => {
  const response = await axios.post(
    `/playerRequest/makeRequest/${gameId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getRequestsForGame = async (gameId: string, token: string) => {
  const response = await axios.post(`/playerRequest/game/${gameId}`,{
    
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const approvePlayerRequest = async (requestId: string, token: string) => {
  const response = await axios.patch(
    `/playerRequest/${requestId}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const rejectPlayerRequest = async (requestId: string, token: string) => {
  const response = await axios.patch(
    `/playerRequest/${requestId}/reject`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const cancelPlayerRequest = async (requestId: string, token: string) => {
  const response = await axios.post(`/playerRequest/delete/${requestId}`,{}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.status === 204;
};

export const getMyPlayerRequests = async (token: string) => {
  const response = await axios.post(`/playerRequest/my`,{}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
