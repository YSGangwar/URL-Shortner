const pool = require('../utils/postrgredb');
const crypto = require('crypto');

const BASE62_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

 

function toBase62(buffer) {
    const base62 = [];
    let num = BigInt('0x' + buffer.toString('hex'));
    while (num > 0) {
      const remainder = num % 62n;
      base62.push(BASE62_CHARS[remainder]);
      num = num / 62n;
    }
  
    return base62.reverse().join('');
  }
  
  function hashToBase62(input) {
    const hash = crypto.createHash('sha256').update(input).digest(); // Generate SHA-256 hash
    const truncatedHash = hash.slice(0, 6); // Use only the first 6 bytes (48 bits)
    return toBase62(truncatedHash); // Convert to Base62
  }


const urlShortner = async(url)=>{
    try {
        const totalRows = await pool.query('SELECT COUNT(*) FROM URLS');
        const hashedData  = hashToBase62(`URLID${totalRows.rows[0].count}`);
        const hashedUrl = 'http://localhost:3001/'+ hashedData;
        const query = 'INSERT INTO URLS (hashedurl, url) VALUES ( $1, $2)';
        const values = [hashedData, url];

        await pool.query(query, values);
       
        return hashedUrl;
    } catch (err) {
        console.error('Error executing query:', err.stack);
    }
}

const urlFinder = async(hashedData) => {
    try {   
        const databaseKey = hashedData;
        const query = 'SELECT URL FROM URLS WHERE HASHEDURL = $1';
        const values = [databaseKey];

        const result = await pool.query(query, values);

        if (result.rows.length > 0) {
            return result.rows[0].url; // Return the URL from the result
        } else {
            return 'No matching URL found';
        }
        
    } catch (error) {
	    console.log("TCL: urlFinder -> error", error)   
    }
}
module.exports  = { urlShortner , urlFinder}