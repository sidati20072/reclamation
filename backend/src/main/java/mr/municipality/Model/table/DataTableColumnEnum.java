package mr.municipality.Model.table;

import java.util.List;
import java.util.Map;

public enum DataTableColumnEnum {
    USER_VIEW {
        @Override
        public List<Map<String, Object>> getColumnsList() {
            return UserColumnsEnum.allConfigs("");
        }

        @Override
        public String getValue() {
            return "user-view";
        }
    },
    RECLAMATION_VIEW {
        @Override
        public List<Map<String, Object>> getColumnsList() {
            return ReclamationColumnsEnum.allConfigs("");
        }

        @Override
        public String getValue() {
            return "reclamation-view";
        }
    },
    PAYMENT_LINE_VIEW {
        @Override
        public List<Map<String, Object>> getColumnsList() {
            return PaymentLineColumnsEnum.allConfigs("");
        }

        @Override
        public String getValue() {
            return "payment-line-view";
        }
    };


    public abstract List<Map<String, Object>> getColumnsList();

    public abstract String getValue();

}
