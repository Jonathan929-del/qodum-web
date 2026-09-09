import { z } from 'zod';

export const optionalNumberField = () =>
  z.string().refine((v) => v === '' || !isNaN(Number(v)), { message: '*Please enter a numeric value' });

export const requiredNumberField = () =>
  z.string().refine(
    (v) => v !== '' && !isNaN(Number(v)),
    (v) => ({ message: v === '' ? '*Please enter a value' : '*Please enter a numeric value' })
  );

export const toDbNumber = (v: string | undefined): number | undefined =>
  v === undefined || v === '' ? undefined : Number(v);