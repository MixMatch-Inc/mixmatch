// This file will contain authentication utilities
// Replace these mock functions with your actual API calls

// Mock function to get the current user's token
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token")
  }
  return null
}

// Mock function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken()
}

// Mock function to log out the user
export const logout = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token")
    window.location.href = "/"
  }
}

// Mock function to make authenticated API requests
export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = getToken()

  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  }

  return fetch(url, {
    ...options,
    headers,
  })
}
