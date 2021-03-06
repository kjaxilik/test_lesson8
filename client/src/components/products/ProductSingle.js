import React, { Component } from 'react';
import Slider from 'react-slick';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';
import { getProductById } from '../../actions/productActions';
import { connect } from 'react-redux';

//import { Link } from 'react-router-dom';

//import PropTypes from 'prop-types';
//import { connect } from 'react-redux';

class ProductPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {}
    };

    let { id } = this.props.match.params;
    this.props.getProductById(id);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.product) {
      this.setState({ product: newProps.product });
    }
  }
  render() {
    var sliderSet = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      cssEase: 'linear',
      pauseOnHover: true,
      adaptiveHeight: true,
      slickNext: true,
      slickPrev: true
    };
    return (
      <React.Fragment>
        {/*<!-- ##### Shop Grid Area Start ##### --> */}
        <section className="single_product_details_area d-flex align-items-center">
          {/* <!-- Single Product Thumb -->*/}
          <div className="single_product_thumb clearfix">
            {/* React Slick Carousel: https://github.com/akiran/react-slick
           settings: https://react-slick.neostack.com/docs/api/
          methods: https://react-slick.neostack.com/docs/api/#methods*/}
            <Slider {...sliderSet}>
              {/*https://github.com/FormidableLabs/nuka-carousel */}
              <div>
                <img src="../images/product-img/product-big-1.jpg" alt="" />
              </div>
              <div>
                <img src="../images/product-img/product-big-2.jpg" alt="" />
              </div>
              <div>
                <img src="../images/product-img/product-big-3.jpg" alt="" />
              </div>
            </Slider>
          </div>
          {/* <!-- Single Product Description -->*/}
          <div className="single_product_desc clearfix">
            <span>mango</span>
            <a href="cart.html">
              <h2>{this.state.product.name}</h2>
            </a>
            <p className="product-price">
              <span className="old-price">${this.state.product.price}</span> $
              {this.state.product.price}
            </p>
            <p className="product-desc">{this.state.product.description}</p>

            {/* <!-- Form -->*/}
            <form className="cart-form clearfix" method="post">
              {/* <!-- Select Box -->*/}
              <div className="select-box d-flex mt-50 mb-30">
                <select className="nice-select" name="select" id="productSize">
                  <option value="value">Size: XL</option>
                  <option value="value">Size: X</option>
                  <option value="value">Size: M</option>
                  <option value="value">Size: S</option>
                </select>
                <select className="nice-select" name="select" id="productColor">
                  <option value="value">Color: Black</option>
                  <option value="value">Color: White</option>
                  <option value="value">Color: Red</option>
                  <option value="value">Color: Purple</option>
                </select>
              </div>
              {/* <!-- Cart & Favourite Box -->*/}
              <div className="cart-fav-box d-flex align-items-center">
                {/* <!-- Cart -->*/}
                <button type="submit" name="addtocart" value="5" className="btn essence-btn">
                  Add to cart
                </button>
                {/* <!-- Favourite -->*/}
                {/*<div className="product-favourite ml-4">
                  <a href="#" className="favme fa fa-heart" />
                </div>*/}
              </div>
            </form>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  product: state.product.currentProduct
});

export default connect(
  mapStateToProps,
  { getProductById }
)(ProductPage);
