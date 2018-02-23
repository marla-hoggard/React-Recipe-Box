import React from 'react';
import ReactDOM from 'react-dom';
import RecipeList from './RecipeList';
import DialogBox from './DialogBox';
import './index.css';

class RecipeBox extends React.Component {
	constructor(props) {
		super(props);
		this.state= {
			showEditBox: false,
			editRecipe: {recipeName: '', ingredients: [], directions: ''},
			editRecipeID: 'newRecipe',
			activeRecipeList: activeRecipeList,
		};
		this.showEditDialog = this.showEditDialog.bind(this);
		this.closeDialog = this.closeDialog.bind(this);

		this.handleChange = this.handleChange.bind(this);
		this.submitRecipe = this.submitRecipe.bind(this);
		this.deleteRecipe = this.deleteRecipe.bind(this);
	}

	//Updates state for every key stroke in edit form
	handleChange(event) {
		let {recipeName, ingredients, directions} = this.state.editRecipe;
		const target = event.target;
		console.log('target name:' + target.name,'target value:' + target.value);
		if (target.name === 'recipeName') {
			recipeName = target.value;
		}
		else if (target.name === 'ingredients') {
			ingredients = target.value.split(',');
		}
		else {
			directions = target.value;
		}
		this.setState({editRecipe: {recipeName: recipeName, ingredients: ingredients, directions: directions}});	
	}

	//Updates local storage and activeRecipeList in state with new or edited recipe info and rerenders without Dialog Box
	submitRecipe() {
		let activeList = JSON.parse(localStorage.getItem('recipes'));
		console.log(activeList);

		let activeItem = activeList.filter(item => item.recipeID === this.state.editRecipeID);

		//Recipe already existed, update in local storage
		if (activeItem.length > 0) {
			activeItem[0].recipe = this.state.editRecipe;
		}

		//Add new recipe, ID is existing max ID + 1
		else {
			let newID = Math.max.apply(Math,activeList.map(item => item.recipeID)) + 1;
			activeList.push({recipeID: newID, recipe: this.state.editRecipe});
		}

		console.log(activeList);

		//Update localStorage
		localStorage.setItem('recipes',JSON.stringify(activeList));

		this.setState( {
			showEditBox: false,
			activeRecipeList: activeList,
		});

	}

	//Delete recipe with recipeID 'ID' and rerender without it
	deleteRecipe(ID) {
		console.log(`ID: ${ID}`);
		let activeList = this.state.activeRecipeList;
		console.log(`previousList: ${activeList}`);
		let updatedList = activeList.filter(item => item.recipeID !== ID);
		console.log(`updatedList: ${updatedList}`);

		localStorage.setItem('recipes',JSON.stringify(updatedList));
		this.setState( {
			activeRecipeList: updatedList,
		});

	}

	//Display add/edit box. If clicked edit, recipe's info will be filled in
	showEditDialog(ID) {
		console.log(`ID: ${ID}`);
		let activeItem = this.state.activeRecipeList.filter(item => item.recipeID === ID);
		let recipe, recipeID;
		if (activeItem.length > 0) {
			recipe = activeItem[0].recipe;
			recipeID = ID;
		}
		else {
			recipe = {recipeName: '', ingredients: [], directions: ''};
			recipeID = 'newRecipe';
		}
		this.setState( {
			showEditBox: true,
			editRecipe: recipe,
			editRecipeID: recipeID,
		});
	}

	//Close the dialog box without making any changes to the recipe database
	closeDialog() {
		this.setState( {
			showEditBox: false,
		});
	}

	render() {
		
		return (
			<div id='container'>
				<div className='header'>Recipe Box</div>
				<RecipeList recipes={this.state.activeRecipeList} clickEdit={this.showEditDialog} clickDelete={this.deleteRecipe}/>
				<button className='add-button btn' onClick={this.showEditDialog}>Add Recipe</button>
				{this.state.showEditBox && <DialogBox 
											recipeID={this.state.editRecipeID} 
											recipe={this.state.editRecipe} 
											handleChange={this.handleChange}
											clickSubmit={this.submitRecipe} 
											clickClose={this.closeDialog} />}
			</div>
		);

	}

}


//Some recipes to initialize the website with
const initialRecipes = [
	{recipeID: 0, recipe: {recipeName: 'Spaghetti with Meatballs', ingredients: ['spaghetti','meatballs','tomato sauce'], directions: 'Cook pasta. Warm meatballs. Heat sauce. Combine and serve.' }},
	{recipeID: 1, recipe: {recipeName: 'Golden Mushroom Chicken + Pasta', ingredients: ['Campbells Golden Mushroom Soup', '1/2 cup sherry', 'bowtie pasta', 'boneless, skinless chicken thighs'], directions: 'Preheat oven to 375˚. Combine soup and sherry. Place chicken in baking dish and pour sauce mixture over chicken. Baked 12-15 minutes until fully cooked. Meanwhile, cook pasta according to directions. Top pasta with cooked chicken and sauce. Reserve extra sauce, if necessary. Enjoy!'}},
	{recipeID: 2, recipe: {recipeName: 'Easy Asian Chicken', ingredients: ['chicken','hoisin sauce','oyster sauce','wine (dry white or rose)'], directions: 'Preheat over to 350˚. Combine all sauce ingredients and pour over chicken in baking dish. Bake 12-15 minutes or until desired doneness. Great with rice!' }}
]

//Pull down list from localStorage or initialize with hard-coded list
let activeRecipeList;
if (localStorage.getItem('recipes') !== null) {
	activeRecipeList = JSON.parse(localStorage.getItem("recipes"));
}
else {
	localStorage.setItem('recipes',JSON.stringify(initialRecipes));
	activeRecipeList = initialRecipes;
}


//============================================================

ReactDOM.render(<RecipeBox />, document.getElementById('root'));
