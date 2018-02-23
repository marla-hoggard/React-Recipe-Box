import React from 'react';

//Used for Add New and Edit
//If recipeID = 'newRecipe', then draw DialogBox
//Else it's an edit box
export default class DialogBox extends React.Component {
	render() {
		//let submitText = this.props.recipeID === 'newRecipe' ? 'Add Recipe' : 'Save';
		let submitText, titleText;
		let {recipeName, ingredients, directions} = this.props.recipe;
		if (this.props.recipeID === 'newRecipe') {
			submitText = 'Add Recipe';
			titleText = 'Add Recipe';
			//({recipeName, ingredients, directions} = this.state.recipe);
		}
		else {
			submitText = 'Save';
			titleText = 'Edit Recipe';
			//({recipeName, ingredients, directions} = this.props.recipe);
		}
		//let recipeToEdit = this.state.recipe;
		//console.log(recipeToEdit);
		//let ingredientString = ingredients.join(",");
		return (
			<div className='addBox'>
				<div className="header">{titleText}</div>
				<div className='addForm'>
					<form>
						<label><b>Name</b></label><br/>
						<input id='newRecipeName' type='text' name='recipeName' value={recipeName} onChange={this.props.handleChange}/><br/>
						<label><b>Ingredients</b> (separated by commas)</label><br/>
						<textarea id='newIngredients' name='ingredients' rows='2' value={ingredients.join(',')} onChange={this.props.handleChange}></textarea><br/>
						<label><b>Directions</b></label><br/>
						<textarea id='newDirections' name="desc" rows="3" value={directions} onChange={this.props.handleChange}></textarea>
					</form>
					<p className="add-buttons">
						<button className="submit-button btn" onClick={this.props.clickSubmit}>{submitText}</button>
						<button className="close-button btn" onClick={this.props.clickClose}>Close</button>
					</p>	
				</div>
			</div>
		);
	}
}