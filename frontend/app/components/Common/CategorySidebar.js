import React from 'react';
import { useHistory } from 'react-router-dom';
import { FaLeaf, FaSnowflake, FaAppleAlt, FaSeedling, FaStar, FaCrown } from 'react-icons/fa';
import { connect } from 'react-redux';
import './CategorySidebar.scss';

// Map icon cho từng slug hoặc name
const iconMap = {
  'sau-rieng-tuoi': <FaLeaf color='#43b02a' />,
  'sau-rieng-dong-lanh': <FaSnowflake color='#00bcd4' />,
  'sau-rieng-che-bien': <FaAppleAlt color='#ff9800' />,
  'ri-6': <FaSeedling color='#8bc34a' />,
  'monthong': <FaStar color='#ffc107' />,
  'musang-king': <FaCrown color='#ffb300' />,
};

const CategorySidebar = ({ categories }) => {
  const history = useHistory();
  const handleCategoryClick = (cat) => {
    history.push(`/shop?category=${cat.slug}`);
  };
  return (
    <aside className='category-sidebar'>
      <div className='category-sidebar-title'>Danh mục</div>
      <ul className='category-list'>
        {categories && categories.map((cat, idx) => (
          <li key={cat._id || idx} className='category-item' onClick={() => handleCategoryClick(cat)}>
            <span className='category-icon'>{iconMap[cat.slug] || <FaLeaf color='#43b02a' />}</span>
            <span className='category-name'>{cat.name}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

const mapStateToProps = state => ({
  categories: state.category.storeCategories || []
});

export default connect(mapStateToProps)(CategorySidebar); 