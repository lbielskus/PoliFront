import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';
import {
  Send,
  CheckCircle,
  User,
  Phone,
  Mail,
  MessageSquare,
  FileText,
} from 'lucide-react';

const CongratulationTable = () => {
  return (
    <div className='max-w-2xl mx-auto mt-8 p-8 bg-white rounded-3xl shadow-xl border border-gray-100'>
      <div className='text-center'>
        <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
          <CheckCircle className='w-8 h-8 text-green-600' />
        </div>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>
          Dėkojame jums už jūsų užklausą!
        </h2>
        <div className='text-gray-600 space-y-2'>
          <p>Jūsų užklausa išsiųsta sėkmingai.</p>
          <p>Greitu metu, mūsų komanda su jumis susisieks.</p>
        </div>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!e.target.value.trim()) {
      e.target.setCustomValidity('Užpildykite privalomus laukus');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handlephoneNumberChange = (e) => {
    setphoneNumber(e.target.value);

    if (!e.target.value.trim()) {
      e.target.setCustomValidity('Užpildykite privalomus laukus');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);

    if (!e.target.value.trim()) {
      e.target.setCustomValidity('Užpildykite privalomus laukus');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleClientEmailChange = (e) => {
    setClientEmail(e.target.value);

    if (!e.target.value.trim()) {
      e.target.setCustomValidity('Užpildykite privalomus laukus');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);

    if (!e.target.value.trim()) {
      e.target.setCustomValidity('Užpildykite privalomus laukus');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const phoneRegex = /^[+]?[0-9]*$/;

    if (!phoneRegex.test(phoneNumber)) {
      toast.error('Įveskite teisingą telefono numerį.', {
        duration: 3000,
        position: 'top-center',
      });
      setLoading(false);
      return;
    }

    const formData = {
      name,
      phoneNumber,
      subject,
      message,
      clientEmail,
    };

    try {
      const response = await fetch('/api/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setName('');
        setphoneNumber('');
        setSubject('');
        setMessage('');
        setClientEmail('');

        toast.success('Pranešimas sėkmingai išsiųstas!', {
          duration: 3000,
          position: 'top-center',
        });
        setFormSubmitted(true);
      } else {
        // Handle error silently
      }
    } catch (error) {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {formSubmitted ? (
        <CongratulationTable />
      ) : (
        <div className='max-w-4xl mx-auto mt-8 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden'>
          {/* Header Section */}
          <div className='bg-gradient-to-r from-button/10 via-primary/10 to-button/10 px-8 py-12 text-center'>
            <h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
              Turite klausimų? Turime atsakymus.
            </h2>
            <p className='text-lg text-gray-600 mb-2 max-w-2xl mx-auto'>
              Ieškote daugiau informacijos apie mūsų keliones arba reikia
              pagalbos išsirenkant tobulą variantą?
            </p>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Esame čia, kad padėtume iškilus klausimams. Susisiekite su mumis
              ir mes būtinai Jums atsakysime!
            </p>
          </div>

          {/* Form Section */}
          <div className='p-8 lg:p-12'>
            {loading && (
              <div className='flex justify-center mb-8'>
                <Spinner />
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* First Row */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label
                    htmlFor='name'
                    className='flex items-center gap-2 text-sm font-semibold text-gray-700'
                  >
                    <User className='w-4 h-4 text-button' />
                    Vardas *
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={name}
                    onChange={handleNameChange}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-button/20 focus:border-button transition-all duration-300 bg-gray-50 hover:bg-white'
                    placeholder='Įveskite savo vardą'
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='phoneNumber'
                    className='flex items-center gap-2 text-sm font-semibold text-gray-700'
                  >
                    <Phone className='w-4 h-4 text-button' />
                    Tel. Nr. *
                  </label>
                  <input
                    type='text'
                    id='phoneNumber'
                    name='phoneNumber'
                    value={phoneNumber}
                    onChange={handlephoneNumberChange}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-button/20 focus:border-button transition-all duration-300 bg-gray-50 hover:bg-white'
                    placeholder='+370XXXXXXXX'
                    required
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label
                    htmlFor='subject'
                    className='flex items-center gap-2 text-sm font-semibold text-gray-700'
                  >
                    <FileText className='w-4 h-4 text-button' />
                    Tema *
                  </label>
                  <input
                    type='text'
                    id='subject'
                    name='subject'
                    value={subject}
                    onChange={handleSubjectChange}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-button/20 focus:border-button transition-all duration-300 bg-gray-50 hover:bg-white'
                    placeholder='Kokia tema norite aptarti?'
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='clientEmail'
                    className='flex items-center gap-2 text-sm font-semibold text-gray-700'
                  >
                    <Mail className='w-4 h-4 text-button' />
                    El. Paštas *
                  </label>
                  <input
                    type='email'
                    id='clientEmail'
                    name='clientEmail'
                    value={clientEmail}
                    onChange={handleClientEmailChange}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-button/20 focus:border-button transition-all duration-300 bg-gray-50 hover:bg-white'
                    placeholder='jusu@email.com'
                    required
                  />
                </div>
              </div>

              {/* Message Row */}
              <div className='space-y-2'>
                <label
                  htmlFor='message'
                  className='flex items-center gap-2 text-sm font-semibold text-gray-700'
                >
                  <MessageSquare className='w-4 h-4 text-button' />
                  Pranešimas *
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={message}
                  onChange={handleMessageChange}
                  rows='5'
                  className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-button/20 focus:border-button transition-all duration-300 bg-gray-50 hover:bg-white resize-none'
                  placeholder='Parašykite savo klausimą ar pranešimą...'
                  required
                />
              </div>

              {/* Required Fields Notice */}
              <div className='bg-gray-50 rounded-xl p-4 border border-gray-200'>
                <p className='text-sm text-gray-600 text-center'>
                  <span className='text-red-500'>*</span> Pažymėti laukai yra
                  privalomi
                </p>
              </div>

              {/* Submit Button */}
              <div className='flex justify-center pt-4'>
                <button
                  type='submit'
                  disabled={loading}
                  className='inline-flex items-center gap-3 px-8 py-4 bg-button hover:bg-hover3 disabled:bg-gray-400 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:transform-none disabled:shadow-none'
                >
                  {loading ? (
                    <>
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                      Siunčiama...
                    </>
                  ) : (
                    <>
                      Išsiųsti pranešimą
                      <Send className='w-5 h-5' />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
