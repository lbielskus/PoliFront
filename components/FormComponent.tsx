import { useState } from 'react';

export default function FormComponent() {
  const [formData, setFormData] = useState({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        window.location.href = '/dashboard';
      } else {
        // Handle error silently
      }
    } catch (error) {
      // Handle network error silently
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='name' onChange={handleChange} />
      <button type='submit'>Submit</button>
    </form>
  );
}
