import React from 'react';

//Each individual recipe
export default class Recipe extends React.Component {
	constructor(props) {
		super(props); //recipeID, recipe, clickEdit, clickDelete
		//state and handleClick functions are for show/hide accordion
		this.state = {open: false,
					  cssClass: 'recipe-name',
					  style: {maxHeight: 0}
					  };
		this.handleClick = this.handleClick.bind(this);
	}

	//Open or close recipe accordion
	handleClick() {
		this.setState(prevState => {
			if (prevState.open === true) {
				return {
					open: false,
					cssClass: 'recipe-name',
					style: {maxHeight: 0}
				};
			}
			else {
				return {
					open: true,
					cssClass: 'recipe-name active',
					style: {maxHeight: '1000px'}
				};
			}
		})
	}

	render() {
		const {recipe, recipeID, clickEdit, clickDelete} = this.props;
		const {cssClass, style} = this.state;
		return (
			<div className='recipe'>
				<button 
					className={cssClass}
					onClick={this.handleClick} >
					{recipe.recipeName} 
				</button>
				<div className="details-div" style={style}>
					<div className='ingredients-div'>
						<fieldset>
							<legend>Ingredients</legend>
							{recipe.ingredients.map((ingr,index) => {
								return (
									<div key={'ing' + index} >
										<input type="checkbox" 
											id={recipeID + 'ing' + index} 
											name={'ing' + index} 
											value= {'ing' + index}/>
										<label htmlFor={'ing' + index}> {ingr}</label>
									</div>
								);
							})}
						</fieldset>
					</div>
					<div className="directions">
						{recipe.directions}
					</div>
					<div className="edit-buttons">
						<button className="edit-button btn" onClick={(recipeID) => clickEdit(this.props.recipeID)}>Edit</button>
						<button className="delete-button btn" onClick={(recipeID) => clickDelete(this.props.recipeID)}>Delete</button>
				</div>
				</div>
			</div>
		);
	}
};
