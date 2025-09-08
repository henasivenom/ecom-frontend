import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const BookCard = ({ book }) => {
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error('Please login to add items to cart', {
        style: {
          border: '1px solid #DC2626',
          padding: '16px',
          color: '#DC2626',
        },
        iconTheme: {
          primary: '#DC2626',
          secondary: '#FFFFFF',
        },
      });
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      const success = await addToCart(book._id);
      
      if (success) {
        toast.success(`Added "${book.title}" to cart!`, {
          style: {
            border: '1px solid #059669',
            padding: '16px',
            color: '#059669',
          },
          iconTheme: {
            primary: '#059669',
            secondary: '#FFFFFF',
          },
        });
      } else {
        toast.error('Failed to add to cart', {
          style: {
            border: '1px solid #DC2626',
            padding: '16px',
            color: '#DC2626',
          },
        });
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred. Please try again.', {
        style: {
          border: '1px solid #DC2626',
          padding: '16px',
          color: '#DC2626',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto"
    >
      <motion.div 
        className="relative w-full h-[400px] flex justify-center items-center bg-gray-100 overflow-hidden"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <img
          src="https://dummyimage.com/200x300/b0b0b0/ffffff.jpg&text=Book+Cover"
          alt={book.title}
          className="w-[200px] h-[300px] object-cover transition-transform duration-300 ease-out rounded-lg shadow-md"
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          }}
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-4"
              transition={{ duration: 0.2 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={loading}
                className={`bg-white text-blue-600 px-6 py-2 rounded-full font-semibold 
                  shadow-lg hover:bg-blue-50 transition-colors ${
                    loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Adding...</span>
                  </div>
                ) : (
                  'Add to Cart'
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl text-gray-900 line-clamp-1 flex-1 mr-2">
            {book.title}
          </h3>
          <span className="text-lg font-bold text-blue-600">
            ${book.price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-600 mb-3">By {book.author}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {['star1', 'star2', 'star3', 'star4', 'star5'].map((star, index) => (
              <svg
                key={star}
                className={`w-4 h-4 ${index < Math.floor(Math.random() * 2) + 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-500">
              ({Math.floor(Math.random() * 500) + 50} reviews)
            </span>
          </div>
          <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            In Stock
          </span>
        </div>
      </div>
    </motion.div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default BookCard;
