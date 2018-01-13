import React, {Component} from 'react';
import {NavLink, withRouter } from 'react-router-dom'
import { capitalize } from '../utils/helper'
import { connect } from 'react-redux'

class CategoryList extends Component {

    static propTypes = {

    }

    render(){   
        //console.log(this.props.categories)
        return (
            /* Post Categories */
            <div className="category-section">
                <h2>Categories</h2>
                <ul className="category-list">
                    
                    {/*All posts*/}
                    <li key="all">
                        <NavLink to={"/"} activeClassName={
                            this.props.category === 'all' ? "category-selected" : ''
                        }>All</NavLink></li>
                    
                    {/*Category options*/}
                    {this.props.categories.map((category) => (
                        <li key={category.name}>
                            <NavLink to={`/${category.path}`}
                            activeClassName="category-selected">
                            {capitalize(category.name)}
                            </NavLink>
                        </li>    
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({categories}){
    return {
      categories: Object.keys(categories).map((key) => categories[key])
    }
  }

//export default CategoryList
export default connect(mapStateToProps)(CategoryList)