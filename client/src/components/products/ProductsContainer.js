import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
import classnames from 'classnames';

import { getProducts, changePagination } from '../../actions/productActions';
import { addFavourite, getFavourites } from '../../actions/favouriteActions';
import { getCategories } from '../../actions/categoryActions';

import SingleProduct from './SingleProduct';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
//import { connect } from 'react-redux';
// rc slider for cost ranging: https://react-component.github.io/slider/
const Style = {
  height: `200px`,
  backgroundImage: 'url(/images/bg-img/breadcumb.jpg)'
};

class ProductContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      favProducts: [],
      page: 1,
      count: 0,
      pages: [],
      categories: [],
      subcategories: []
    };

    this.props.getProducts(1);
    this.props.getCategories();

    this.changePage = this.changePage.bind(this);
  }

  changePage(page) {
    this.props.changePagination(page);
    this.props.getProducts(page);
    this.setState({ page: page });
  }
  componentDidMount() {
    // if (this.state.products === 0) {
    // }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.products.length > 0) {
      this.setState({ products: newProps.products });
    }

    if (newProps.categories.length > 0) {
      var cat = [];
      var subcat = [];
      newProps.categories.map(el => {
        if (el.parent) {
          subcat.push(el);
        } else {
          cat.push(el);
        }
      });
      if (newProps.categories.length === cat.length + subcat.length) {
        this.setState({ subcategories: subcat, categories: cat });
      }
    }

    if (newProps.categories.parent && this.state.categories.includes(newProps.categories.parent)) {
      this.setState({ categories: newProps.categories.parent });
    }

    // Favourites loading
    if (
      (newProps.user && this.state.favProducts.length === 0) ||
      (newProps.user && newProps.favProducts === undefined)
    ) {
      this.props.getFavourites(newProps.user._id, 1);
      //console.log('first' + newProps.user && this.state.favProducts.length === 0);

      //console.log('second' + newProps.favProducts);
    }

    if (newProps.favProducts.length > 0) {
      this.setState({ favProducts: newProps.favProducts });
    }

    // Количество продуктов
    if (newProps.count) {
      let pagesCount = Math.ceil(newProps.count / 6);
      // short variant of new empty array
      let pages = new Array(pagesCount);
      pages.fill(0);

      const pageNumbers = [];
      for (let i = 1; i <= pagesCount; i++) {
        pageNumbers.push(i);
      }

      this.setState({ pages: pageNumbers });
    }

    if (newProps.page && newProps.page !== this.state.page) {
      this.setState({ page: newProps.page });
    }
  }

  render() {
    var ProductMap = this.state.products.map(el => (
      <React.Fragment>
        <SingleProduct key={el._id} prod={el} />
      </React.Fragment>
    ));

    var CategoryMap = this.state.categories.map(el => (
      <React.Fragment key={el._id}>
        <li data-toggle="collapse" data-target="#clothing">
          {/**<div hidden>{console.log(el)}</div>*/}
          <Link to="#">{el.name}</Link>
          {this.state.subcategories.map(elem => (
            <ul className="sub-menu collapse show" id="clothing">
              <li>
                <Link to="#">{elem.name}</Link>
              </li>
            </ul>
          ))}
        </li>
      </React.Fragment>
    ));

    return (
      <React.Fragment>
        {/*<!-- ##### Breadcumb Area Start ##### --> */}
        <div className="breadcumb_area bg-img" style={Style}>
          <div className="container h-100">
            <div className="row h-100 align-items-center">
              <div className="col-12">
                <div className="page-title text-center">
                  <h2>dresses</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<!-- ##### Breadcumb Area End ##### --> */}
        {/*<!-- ##### Shop Grid Area Start ##### --> */}
        <section className="shop_grid_area section-padding-80">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-4 col-lg-3">
                <div className="shop_sidebar_area">
                  {/* <!-- ##### Single Widget ##### -->*/}
                  <div className="widget catagory mb-50">
                    {/*<!-- Widget Title -->*/}
                    <h6 className="widget-title mb-30">Catagories</h6>

                    {/*<!--  Catagories  -->*/}
                    <div className="catagories-menu">
                      <ul id="menu-content2" className="menu-content collapse show">
                        {/************************
                                CATEGORIES 
                        ************************/}
                        {CategoryMap}
                      </ul>
                    </div>
                  </div>

                  {/*<!-- ##### Single Widget ##### -->*/}
                  <div className="widget price mb-50">
                    {/*<!-- Widget Title -->*/}
                    <h6 className="widget-title mb-30">Filter by</h6>
                    {/*<!-- Widget Title 2 -->*/}
                    <p className="widget-title2 mb-30">Price</p>

                    <div className="widget-desc">
                      <div className="slider-range">
                        <div
                          data-min="49"
                          data-max="360"
                          data-unit="$"
                          className="slider-range-price ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
                          data-value-min="49"
                          data-value-max="360"
                          data-label-result="Range:"
                        >
                          <div className="ui-slider-range ui-widget-header ui-corner-all" />
                          <span
                            className="ui-slider-handle ui-state-default ui-corner-all"
                            /* tabindex="0"*/
                          />
                          <span
                            className="ui-slider-handle ui-state-default ui-corner-all"
                            /* tabindex="0"*/
                          />
                        </div>
                        <div className="range-price">Range: $49.00 - $360.00</div>
                      </div>
                    </div>
                  </div>

                  {/*<!-- ##### Single Widget ##### -->*/}
                  <div className="widget color mb-50">
                    {/*<!-- Widget Title 2 -->*/}
                    <p className="widget-title2 mb-30">Color</p>
                    <div className="widget-desc">
                      <ul className="d-flex">
                        <li>
                          <Link to="#" className="color1" />
                        </li>
                        <li>
                          <Link to="#" className="color2" />
                        </li>
                        <li>
                          <Link to="#" className="color3" />
                        </li>
                        <li>
                          <Link to="#" className="color4" />
                        </li>
                        <li>
                          <Link to="#" className="color5" />
                        </li>
                        <li>
                          <Link to="#" className="color6" />
                        </li>
                        <li>
                          <Link to="#" className="color7" />
                        </li>
                        <li>
                          <Link to="#" className="color8" />
                        </li>
                        <li>
                          <Link to="#" className="color9" />
                        </li>
                        <li>
                          <Link to="#" className="color10" />
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/*<!-- ##### Single Widget ##### -->*/}
                  <div className="widget brands mb-50">
                    {/*<!-- Widget Title 2 -->*/}
                    <p className="widget-title2 mb-30">Brands</p>
                    <div className="widget-desc">
                      <ul>
                        <li>
                          <Link to="#">Asos</Link>
                        </li>
                        <li>
                          <Link to="#">Mango</Link>
                        </li>
                        <li>
                          <Link to="#">River Island</Link>
                        </li>
                        <li>
                          <Link to="#">Topshop</Link>
                        </li>
                        <li>
                          <Link to="#">Zara</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-8 col-lg-9">
                <div className="shop_grid_product_area">
                  <div className="row">
                    <div className="col-12">
                      <div className="product-topbar d-flex align-items-center justify-content-between">
                        {/*<!-- Total Products -->*/}
                        <div className="total-products">
                          <p>
                            <span>186</span> products found
                          </p>
                        </div>
                        {/*<!-- Sorting -->*/}
                        <div className="product-sorting d-flex">
                          <p>Sort by:</p>
                          <form action="#" method="get">
                            <select name="select" id="sortByselect">
                              <option value="value">Highest Rated</option>
                              <option value="value">Newest</option>
                              <option value="value">Price: $$ - $</option>
                              <option value="value">Price: $ - $$</option>
                            </select>
                            <input type="submit" className="d-none" value="" />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*****************
                  Single Products 
                **********************/}
                  <div className="row">{ProductMap}</div>
                </div>
                {/* <!-- Pagination -->*/}
                <nav aria-label="navigation">
                  <ul className="pagination mt-50 mb-70">
                    <li className={classnames('page-item', { disabled: this.state.page === 1 })}>
                      <Link
                        className="page-link"
                        to="#"
                        onClick={() => {
                          this.changePage(this.state.page - 1);
                        }}
                      >
                        <i className="fa fa-angle-left" />
                      </Link>
                    </li>
                    {this.state.pages.map(el => (
                      <li className={classnames('page-item', { active: this.state.page === el })}>
                        <Link
                          className="page-link"
                          to="#"
                          key={el.index}
                          p={el}
                          onClick={() => {
                            this.changePage(el);
                          }}
                        >
                          {el}
                        </Link>
                      </li>
                    ))}

                    <li
                      className={classnames('page-item', {
                        disabled: this.state.page === this.state.pages.length
                      })}
                    >
                      <Link
                        className="page-link"
                        to="#"
                        onClick={() => {
                          this.changePage(this.state.page + 1);
                        }}
                      >
                        <i className="fa fa-angle-right" />
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

// ProductContainer.propTypes = {
//   products: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  products: state.product.products,
  favProducts: state.favourites.favouriteProducts,
  currentPage: state.product.page,
  count: state.product.count,
  user: state.user.user,
  categories: state.categories.categories
});

export default connect(
  mapStateToProps,
  { getProducts, changePagination, getFavourites, getCategories }
)(ProductContainer);
