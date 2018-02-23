import React from 'react';
import Recipe from './Recipe'

//Receives a prop 'recipes' - an array of recipe objects: 
//keys: recipeName, ingredients [], directions)
//Also receives clickEdit and clickDelete purely for passing down to <Recipe/>
export default class RecipeList extends React.Component {
	renderRecipe(recipeObj) {
		//let recipeID = 'rec' + index;
		let {recipeID, recipe} = recipeObj;
		return <Recipe 
				key={recipeID} 
				recipe={recipe} 
				recipeID={recipeID} 
				clickEdit={(recipeID) => this.props.clickEdit(recipeID)}
				clickDelete={(recipeID) => this.props.clickDelete(recipeID)} />
	}

	render() {
		//An array of recipe objects
		const recipes = this.props.recipes;
		let recipeList = [];
		console.log("Recipes from RecipeList:",recipes);
		recipes.forEach((recipeObj) => {
			recipeList.push(this.renderRecipe(recipeObj));
		});
		return (
			<div className='recipes'>
				{recipeList}
			</div>
		);

	}
}
