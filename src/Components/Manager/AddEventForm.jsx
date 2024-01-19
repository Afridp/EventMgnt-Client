import { useState } from 'react';
// import './AddEventForm.css'; // Import your CSS file for additional styling

function AddEventForm() {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState(Array.from({ length: 4 }, () => null));

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageFileChange = (e, index) => {
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = e.target.files[0];
    setImageFiles(newImageFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process the form data here (e.g., send it to the server)
    console.log('Event Name:', eventName);
    console.log('Description:', description);
    console.log('Image Files:', imageFiles);
  };
  const inputStyle = {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };
  
  const buttonStyle = {
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '4px',
    border: 'none',
  };
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleSubmit}>
        <label>
          Event Name:
          <input type="text" value={eventName} onChange={handleEventNameChange} style={inputStyle} required />
        </label>

        <label>
          Description:
          <textarea value={description} onChange={handleDescriptionChange} style={inputStyle} required />
        </label>

        {[0, 1, 2, 3].map((index) => (
          <label key={index}>
            Image {index + 1}:
            <input type="file" onChange={(e) => handleImageFileChange(e, index)} accept="image/*" style={inputStyle} />
          </label>
        ))}

        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
}

export default AddEventForm;
