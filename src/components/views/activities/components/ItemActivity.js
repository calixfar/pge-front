import React from 'react';

export default () => {
    return (
        <tr>
            <td>
                <div className="form-check">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" defaultValue defaultChecked />
                        <span className="form-check-sign">
                            <span className="check" />
                        </span>
                    </label>
                </div>
            </td>
            <td>Sign contract for "What are conference organizers afraid of?"</td>
            <td className="td-actions text-right">
                <button type="button" rel="tooltip" title="Edit Task" className="btn btn-primary btn-link btn-sm">
                    <i className="material-icons">edit</i>
                </button>
                <button type="button" rel="tooltip" title="Remove" className="btn btn-danger btn-link btn-sm">
                    <i className="material-icons">close</i>
                </button>
            </td>
        </tr>
    )
}