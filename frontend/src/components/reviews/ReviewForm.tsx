import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState, type FormEvent } from 'react';
import { parseApiError } from '../../api/errors';
import { submitReview } from '../../api/reviews';
import { MESSAGES } from '../../config/messages';
import { brand } from '../../theme/tokens';
import type { FieldErrors, NewReview, SubmitStatus } from '../../types';
import { hasErrors, LIMITS, validateReview, type ReviewFormValues } from '../../utils/validation';

const EMPTY_FORM: ReviewFormValues = { name: '', rating: null, comment: '' };
const RATING_LABEL_ID = 'review-rating-label';
const RATING_ERROR_ID = 'review-rating-error';

export function ReviewForm() {
  const [values, setValues] = useState<ReviewFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors<NewReview>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>(MESSAGES.reviews.error);

  const submitting = status === 'submitting';

  const update = <K extends keyof ReviewFormValues>(field: K, value: ReviewFormValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateReview(values);
    setErrors(validation);
    if (hasErrors(validation) || values.rating === null) return;

    setStatus('submitting');
    try {
      await submitReview({ name: values.name.trim(), rating: values.rating, comment: values.comment.trim() });
      setValues(EMPTY_FORM);
      setStatus('success');
    } catch (error) {
      const parsed = parseApiError(error);
      setErrors(parsed.fieldErrors);
      setErrorMessage(parsed.isRateLimited ? MESSAGES.rateLimited : MESSAGES.reviews.error);
      setStatus('error');
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} aria-label="Write a review" sx={{ display: 'grid', gap: 2.5 }}>
      <TextField
        label="Name"
        name="name"
        autoComplete="name"
        required
        value={values.name}
        onChange={(event) => update('name', event.target.value)}
        error={Boolean(errors.name)}
        helperText={errors.name}
        slotProps={{ htmlInput: { maxLength: LIMITS.reviewName.max } }}
      />

      <Box>
        <Typography id={RATING_LABEL_ID} component="p" sx={{ fontWeight: 500, mb: 0.5 }}>
          Rating *
        </Typography>
        <Rating
          name="rating"
          size="large"
          value={values.rating}
          onChange={(_event, value) => update('rating', value)}
          aria-labelledby={RATING_LABEL_ID}
          aria-describedby={errors.rating ? RATING_ERROR_ID : undefined}
          getLabelText={(value) => `${value} Star${value === 1 ? '' : 's'}`}
          sx={{ color: brand.yellow }}
        />
        {errors.rating && (
          <FormHelperText id={RATING_ERROR_ID} error>
            {errors.rating}
          </FormHelperText>
        )}
      </Box>

      <TextField
        label="Review"
        name="comment"
        required
        multiline
        minRows={4}
        value={values.comment}
        onChange={(event) => update('comment', event.target.value)}
        error={Boolean(errors.comment)}
        helperText={errors.comment ?? `${values.comment.length}/${LIMITS.reviewComment.max}`}
        slotProps={{ htmlInput: { maxLength: LIMITS.reviewComment.max } }}
      />

      <Box aria-live="polite">
        {status === 'success' && <Alert severity="success">{MESSAGES.reviews.success}</Alert>}
        {status === 'error' && <Alert severity="error">{errorMessage}</Alert>}
      </Box>

      <Button type="submit" variant="contained" color="primary" size="large" disabled={submitting} sx={{ justifySelf: 'start' }}>
        {submitting ? MESSAGES.reviews.submitting : 'Submit Review'}
      </Button>
    </Box>
  );
}
