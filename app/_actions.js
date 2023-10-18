'use server'

export async function updateName(firstName, lastName, username, role, email) {

  const url = `http://localhost:3000/api/auth/update?email=${email}`;
  const data = {
    firstName,
    lastName,
    username,
    role,
  };


  const response = await fetch(url, {
    method: 'PATCH', // Assuming you are using a PATCH request
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;

}
