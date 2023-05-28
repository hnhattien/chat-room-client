const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3100";
export const getBaseURL = () => {
  return typeof window === "undefined"
    ? process.env.REACT_APP_API_URL || API_URL
    : API_URL;
};

export default {
  get: async (url, params = {}) =>
    fetch(
      `${getBaseURL()}${url}${params ? "?" + new URLSearchParams(params) : ""}`,
      {
        credentials: "include",
      }
    ),

  getSync: async (url, params) => {
    const response = await fetch(
      `${getBaseURL()}${url}${params ? "?" + new URLSearchParams(params) : ""}`,
      {
        credentials: "include",
      }
    );

    const result = await response.json();

    if (result.httpCode >= 400) {
      return Promise.reject(result);
    }
    return Promise.resolve(result);
  },
  post: async (url, data = {}) => {
    const response = await fetch(`${getBaseURL()}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.httpCode >= 400) {
      return Promise.reject(result);
    }
    return Promise.resolve(result);
  },
  put: async (url, data = {}) => {
    const response = await fetch(`${getBaseURL()}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.httpCode >= 400) {
      return Promise.reject(result);
    }
    return Promise.resolve(result);
  },
  postFormData: async (url, data) => {
    const response = await fetch(`${getBaseURL()}${url}`, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    const result = await response.json();

    if (result.httpCode >= 400) {
      return Promise.reject(result);
    }
    return Promise.resolve(result);
  },
  // getWithToken: async (url, locale = 'vi', params) => {
  //   const session = await getSession();
  //   const response = await fetch(
  //     `${getBaseURL()}${url}${params ? '?' + new URLSearchParams(params) : ''}`,
  //     {
  //       headers: {
  //         'Accept-Language': locale,
  //         Authorization: `Bearer ${session.accessToken}`,
  //       },
  //     }
  //   );
  //   const result = await response.json();

  //   if (result.httpCode >= 400) {
  //     return Promise.reject(result);
  //   }
  //   return Promise.resolve(result);

  // },
  // postWithToken: async (url, data = {}, locale = 'vi') => {
  //   const session = await getSession();
  //   const auth = session
  //     ? { Authorization: `Bearer ${session?.accessToken}` }
  //     : {};
  //   const response = await fetch(`${getBaseURL()}${url}`, {
  //     method: 'POST',
  //     headers: {
  //       'Accept-Language': locale,
  //       'Content-Type': 'application/json',
  //       ...auth,
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   const result = await response.json();

  //   if (result.httpCode >= 400) {
  //     return Promise.reject(result);
  //   }
  //   return Promise.resolve(result);
  // },
  // putWithToken: async (url, data = {}, locale = 'vi') => {
  //   const session = await getSession();
  //   const auth = session
  //     ? { Authorization: `Bearer ${session?.accessToken}` }
  //     : {};
  //   const response = await fetch(`${getBaseURL()}${url}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Accept-Language': locale,
  //       'Content-Type': 'application/json',
  //       ...auth,
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   const result = await response.json();

  //   if (result.httpCode >= 400) {
  //     return Promise.reject(result);
  //   }
  //   return Promise.resolve(result);
  // },
  // deleteWithToken: async (url, data = {}, locale = 'vi') => {
  //   const session = await getSession();
  //   const auth = session
  //     ? { Authorization: `Bearer ${session?.accessToken}` }
  //     : {};
  //   const response = await fetch(`${getBaseURL()}${url}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Accept-Language': locale,
  //       'Content-Type': 'application/json',
  //       ...auth,
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   const result = await response.json();

  //   if (result.httpCode >= 400) {
  //     return Promise.reject(result);
  //   }
  //   return Promise.resolve(result);
  // },
};
