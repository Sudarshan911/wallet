export default function CommonErrors({submitError, dispatch}) {
    <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
    {submitError}
    <button type="button" onClick={() => { dispatch({ type: 'SET_SUBMIT_ERROR', message: null }); }} class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
}