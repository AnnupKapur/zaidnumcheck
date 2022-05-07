const moment = require('moment');

const luhnCheck = num => {
	let arr = (num + '').split('').reverse().map(x => parseInt(x));
	let lastDigit = arr.splice(0, 1)[0];
	let sum = arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
	sum += lastDigit;
	return sum % 10 === 0;
};

const post_idcheck = (req, res) => {
	const strID = req.params['id'];
  const strDateFormat = 'YYMMDD';

	// ERROR ID LENGTH
	if(strID.length!==13){
		return res.json(
			{
				result: false,
				string: 'fail',
				errors: ['ID number must be only 13 digits']
			}
		)
	}

	const regex = new RegExp(/\d{13}/g);

	// CHECK ID IS NUMBERS
	if(strID.length === 13 && !regex.test(strID)){
		return res.json(
			{
				result: false,
				string: 'fail',
				errors: ['ID number must be only numbers, no letters, no spaces and no special characters']
			}
		)
	}

  console.log(strID);
  console.log(regex.test(strID));

  // CHECK DATE, GENDER, CHECKSUM
  if(strID.length === 13 && regex.test(strID)){
    const dateDOBID = strID.slice(0,6);
    const strGenderID = strID.slice(7,11);

    const dateDOBCheck = req.query.dob;
    const strGenderCheck = req.query.gender;

    const errors = [];

    if(!moment(dateDOBID, strDateFormat).isValid()){
      errors.push('ID is incorrectly formatted');
    }

    if(dateDOBCheck !== undefined){
      if(!moment(dateDOBCheck, strDateFormat).isValid()){
        errors.push('Date of birth is incorrectly formatted');
      }

      if(moment(dateDOBCheck, strDateFormat).isValid() &&
        moment(dateDOBID, strDateFormat).isValid() &&
        !moment(dateDOBCheck, strDateFormat).isSame(moment(dateDOBID, strDateFormat))){
          errors.push('Date of birth does not match the ID')
        }
    }

    if(strGenderCheck!==undefined){
      if(strGenderCheck.toLowerCase() !== 'm' && strGenderCheck.toLowerCase() !== 'male' &&
      strGenderCheck.toLowerCase() !== 'f' && strGenderCheck.toLowerCase() !== 'female'){
        errors.push('Incorrect gender format, use M / F or Male / Female');
      }
      
      if(((strGenderCheck.toLowerCase() === 'm' || strGenderCheck.toLowerCase() === 'male') && parseInt(strGenderID)<5000) || 
      (((strGenderCheck.toLowerCase() === 'f' || strGenderCheck.toLowerCase() === 'female') && parseInt(strGenderID)>=5000))){
        errors.push('Gender does not match the ID')
      }
    }

    if(!luhnCheck(strID)){
      errors.push('ID does not pass checksum validation')
    }

    if(errors.length > 0)
    {
      return res.json({
				result: false,
				string: 'fail',
				errors: errors,
      })
    }

    return res.json({
      result: true,
      string: 'pass',
    })
  }
}

exports.post_idcheck = post_idcheck;