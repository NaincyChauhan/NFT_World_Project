import { useState } from 'react';

const NFTData = ({setNFTData}) => {
    const [formData, setFormData] = useState([{ key: "", value: "" }]);

    const handleFieldChange = (index, field, value) => {
        const updatedFields = [...formData];
        updatedFields[index][field] = value;
        setFormData(updatedFields);
        setNFTData(updatedFields);
    }
    
    const handleRemoveField = (index) => {
        const updatedFields = [...formData];
        updatedFields.splice(index, 1);
        setFormData(updatedFields);
        setNFTData(updatedFields);
    }

    const handleAddField = () => {
        setFormData([...formData, { key: "", value: "" }]);
    }

    return (
        <div>
            <h5>Properties</h5>
            {formData.map((field, index) => (
                <div className='row mt-2' key={index}>
                    <div className='col-md-5 col-sm-5 col-5'>
                        <input
                            type="text"
                            value={field.key}
                            onChange={(e) => handleFieldChange(index, "key", e.target.value)}
                            className="form-control"
                            placeholder="Key"
                        />
                    </div>
                    <div className='col-md-5 col-sm-5 col-5'>
                        <input
                            type="text"
                            value={field.value}
                            onChange={(e) => handleFieldChange(index, "value", e.target.value)}
                            className="form-control"
                            placeholder="Value"
                        />
                    </div>
                    <div className='col-md-2 col-sm-2 col-2'>
                        {index > 0 && (
                            <button type='button' className='btn-main remove-item' onClick={() => handleRemoveField(index)}>
                                <i className="fa fa-fw" aria-hidden="true"></i> 
                            </button>
                        )}
                    </div>
                </div>
            ))}
            <button type='button' className='btn-main add-item mt-2' onClick={handleAddField}>
                <i className="fa fa-fw" aria-hidden="true"></i>
            </button>
        </div>
    );
}

export default NFTData;