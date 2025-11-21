const handleQRYApiError = (error: unknown) => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data &&
    typeof error.response.data === "object"
  ) {
    const apiError = error as {
      response: {
        data: {
          message?: string;
          status?: string;
        };
      };
    };

    if (apiError.response.data.message) {
      return apiError.response.data.message;
    }

    return (
      "An error occurred: " + (apiError.response.data.status || "Unknown error")
    );
  }

  return "An unexpected error occurred";
};

export default handleQRYApiError;
