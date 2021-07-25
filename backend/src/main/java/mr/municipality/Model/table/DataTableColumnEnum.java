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
    ROOM_VIEW {
        @Override
        public List<Map<String, Object>> getColumnsList() {
            return RoomColumnsEnum.allConfigs("");
        }

        @Override
        public String getValue() {
            return "room-view";
        }
    },
    CUPBOARD_VIEW {
        @Override
        public List<Map<String, Object>> getColumnsList() {
            return CupboardColumnsEnum.allConfigs("");
        }

        @Override
        public String getValue() {
            return "cupboard-view";
        }
    },
    LOCKER_VIEW {
        @Override
        public List<Map<String, Object>> getColumnsList() {
            return LockerColumnsEnum.allConfigs("");
        }

        @Override
        public String getValue() {
            return "locker-view";
        }
    },
    BOITIER_VIEW {
        @Override
        public List<Map<String, Object>> getColumnsList() {
            return BoitierColumnsEnum.allConfigs("");
        }

        @Override
        public String getValue() {
            return "boitier-view";
        }
    },
    SVC_VIEW {
        @Override
        public List<Map<String, Object>> getColumnsList() {
            return SvcColumnsEnum.allConfigs("");
        }

        @Override
        public String getValue() {
            return "svc-view";
        }
    },
    DOCUMENT_VIEW {
        @Override
        public List<Map<String, Object>> getColumnsList() {
            return DocumentColumnsEnum.allConfigs("");
        }

        @Override
        public String getValue() {
            return "document-view";
        }
    },
    DOCUMENT_LIST_VIEW {
        @Override
        public List<Map<String, Object>> getColumnsList() {
            return DocumentListColumnsEnum.allConfigs("");
        }

        @Override
        public String getValue() {
            return "document-list-view";
        }
    };


    public abstract List<Map<String, Object>> getColumnsList();

    public abstract String getValue();

}
