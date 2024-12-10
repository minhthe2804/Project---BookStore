import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'

import useQueryParams from './useQueryParams'
import { ProductsConfig } from '~/types/product.type'

export type QueryConfig = {
    [key in keyof ProductsConfig]: string
}

export default function useQueryConfig() {
    const queryParams: QueryConfig = useQueryParams()
    const queryConfig: QueryConfig = omitBy(
        {
            category: queryParams.category
        },
        isUndefined
    )
    return queryConfig
}
